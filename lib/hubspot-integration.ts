/**
 * HubSpot 폼 통합 스크립트
 * Webflow와 HubSpot 간의 폼 제출 및 이메일 도메인 차단 기능
 */

interface BlockList {
  enabled: boolean;
  additionalBlockedDomains?: string[];
}

interface FormResponse {
  redirectUri?: string;
  inlineMessage?: string;
}

class HubSpotFormIntegration {
  private blockedDomains: string[] = [];
  private blockList: BlockList | null = null;

  constructor() {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    // 차단된 도메인 목록 로드
    await this.loadBlockedDomains();
    
    // Webflow HubSpot 폼 처리
    this.handleWebflowHubSpotForms();
    
    // 일반 Webflow 폼 처리
    this.handleWebflowForms();
  }

  private async loadBlockedDomains(): Promise<void> {
    try {
      // 네트워크 요청에 타임아웃 추가
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5초 타임아웃
      
      const response = await fetch('https://hubspotonwebflow.com/assets/js/blockedDomains.json', {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      this.blockedDomains = data;
    } catch (error) {
      console.warn('HubSpot blocked domains 로드 실패, 기본값 사용:', error);
      // 기본 차단 도메인 목록 사용
      this.blockedDomains = [
        '10minutemail.com',
        'guerrillamail.com',
        'tempmail.org',
        'mailinator.com',
        'yopmail.com',
        'throwaway.email',
        'temp-mail.org',
        'sharklasers.com',
        'getairmail.com',
        'mailnesia.com'
      ];
    }
  }

  private updateFormData(formData: FormData): FormData {
    for (const [name, value] of formData.entries()) {
      switch (name) {
        case "hutk":
          const cookies = document.cookie.split(";");
          const cookieMap: { [key: string]: string } = {};

          cookies.forEach((cookie) => {
            const [cookieName, cookieValue] = cookie.trim().split("=");
            if (cookieName && cookieValue) {
              cookieMap[cookieName] = cookieValue;
            }
          });

          const hubspotCookie = cookieMap["hubspotutk"];
          if (hubspotCookie) {
            formData.set(name, hubspotCookie);
          }
          break;
        case "pageUri":
          formData.set(name, window.location.href);
          break;
        case "pageName":
          formData.set(name, document.title);
          break;
        case "pageId":
          formData.set(name, window.location.pathname);
          break;
        default:
          break;
      }
    }
    return formData;
  }

  private async handleWebflowHubSpotForms(): Promise<void> {
    const webflowHubSpotForms = document.querySelectorAll("[data-wf-hs-form]");
    
    if (webflowHubSpotForms.length > 0) {
      for (const form of Array.from(webflowHubSpotForms)) {
        await this.processWebflowHubSpotForm(form as HTMLFormElement);
      }
    }
  }

  private async processWebflowHubSpotForm(form: HTMLFormElement): Promise<void> {
    const actionUrl = new URL(form.action);
    const pathParts = actionUrl.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    
    // 블록리스트 로드
    await this.loadBlockList(id);
    
    // 이메일 도메인 차단 기능 설정
    this.setupEmailDomainBlocking(form);
    
    // 체크박스 유효성 검사 설정
    this.setupCheckboxValidation(form);
    
    // 폼 제출 처리
    this.setupFormSubmission(form);
  }

  private async loadBlockList(id: string): Promise<void> {
    try {
      const response = await fetch(`https://hubspotonwebflow.com/api/forms/blockList?id=${id}`);
      this.blockList = await response.json();
    } catch (error) {
      console.error('Error loading block list:', error);
      this.blockList = { enabled: false };
    }
  }

  private setupEmailDomainBlocking(form: HTMLFormElement): void {
    if (!this.blockList?.enabled) return;

    let additionalBlockedDomains: string[] = [];
    if (this.blockList.additionalBlockedDomains && Array.isArray(this.blockList.additionalBlockedDomains)) {
      additionalBlockedDomains = this.blockList.additionalBlockedDomains;
      this.blockedDomains.push(...additionalBlockedDomains);
    }

    const submitButton = form.querySelector('input[type="submit"], button[type="submit"]') as HTMLInputElement | HTMLButtonElement;
    const emailInputs = form.querySelectorAll('input[type="email"]');

    emailInputs.forEach((input) => {
      input.addEventListener('input', () => {
        const email = (input as HTMLInputElement).value;
        const emailDomain = email.split('@')[1];

        const warningMessage = document.createElement('p');
        warningMessage.style.color = 'red';
        warningMessage.style.marginTop = '1rem';
        warningMessage.style.marginBottom = '1rem';
        warningMessage.style.fontSize = '1rem';
        warningMessage.style.display = 'none';

        const existingWarningMessage = input.parentNode?.querySelector('.warning-message');
        
        if (this.blockedDomains.includes(emailDomain)) {
          submitButton.disabled = true;
          submitButton.style.cursor = 'not-allowed';
          submitButton.style.backgroundColor = 'grey';
          warningMessage.className = 'warning-message';
          warningMessage.textContent = 'This email domain is blocked. Please enter a different email.';
          warningMessage.style.display = 'block';
          
          if (existingWarningMessage) {
            input.parentNode?.removeChild(existingWarningMessage);
          }
          input.parentNode?.appendChild(warningMessage);
        } else {
          submitButton.disabled = false;
          submitButton.style.cursor = '';
          submitButton.style.backgroundColor = '';
          
          if (existingWarningMessage) {
            input.parentNode?.removeChild(existingWarningMessage);
          }
        }
      });
    });
  }

  private setupCheckboxValidation(form: HTMLFormElement): void {
    const checkboxes = form.querySelectorAll('input[type="checkbox"][required]');
    const checkboxMap: { [key: string]: HTMLInputElement[] } = {};

    checkboxes.forEach((checkbox) => {
      const name = (checkbox as HTMLInputElement).name;
      if (!checkboxMap[name]) {
        checkboxMap[name] = [];
      }
      checkboxMap[name].push(checkbox as HTMLInputElement);
    });

    Object.values(checkboxMap).forEach((checkboxes) => {
      if (checkboxes.length > 1) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'At least one checkbox must be checked.';
        errorMessage.style.color = 'red';
        errorMessage.style.display = 'none';
        errorMessage.style.marginTop = '1rem';
        errorMessage.style.marginBottom = '1rem';
        errorMessage.style.fontSize = '1rem';

        checkboxes.forEach((checkbox) => {
          checkbox.required = false;
          checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
              errorMessage.style.display = 'none';
            }
          });
        });

        form.appendChild(errorMessage);

        form.addEventListener('submit', (event) => {
          const isChecked = checkboxes.some((checkbox) => checkbox.checked);
          if (!isChecked) {
            event.preventDefault();
            errorMessage.style.display = 'block';
          } else {
            errorMessage.style.display = 'none';
          }
        });
      }
    });
  }

  private setupFormSubmission(form: HTMLFormElement): void {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      
      let formData = new FormData(form);
      formData = this.updateFormData(formData);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
        });
        
        const data: FormResponse = await response.json();
        
        if ("redirectUri" in data && data.redirectUri) {
          window.location.href = data.redirectUri;
        }

        if ("inlineMessage" in data && data.inlineMessage) {
          const message = document.createElement("div");
          message.style.marginTop = "1rem";
          message.style.marginBottom = "1rem";
          message.innerHTML = data.inlineMessage;
          form.appendChild(message);
          message.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } catch (error) {
        console.error('Form submission error:', error);
      }
    });
  }

  private async handleWebflowForms(): Promise<void> {
    const webflowForms = document.querySelectorAll("[data-webflow-hubspot-api-form-url]");
    
    if (webflowForms.length > 0) {
      for (const form of Array.from(webflowForms)) {
        await this.processWebflowForm(form as HTMLFormElement);
      }
    }
  }

  private async processWebflowForm(form: HTMLFormElement): Promise<void> {
    const actionUrl = new URL(form.dataset.webflowHubspotApiFormUrl || '');
    const pathParts = actionUrl.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    
    // 블록리스트 로드
    await this.loadBlockList(id);
    
    // 이메일 도메인 차단 기능 설정
    this.setupEmailDomainBlocking(form);
    
    // 폼 제출 처리
    this.setupWebflowFormSubmission(form);
  }

  private setupWebflowFormSubmission(form: HTMLFormElement): void {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      
      let formData = new FormData(form);
      formData = this.updateFormData(formData);
      
      form.querySelectorAll("[data-wfhsfieldname]").forEach((field) => {
        const fieldElement = field as HTMLInputElement;
        if (fieldElement.type === "file") {
          if (fieldElement.files && fieldElement.files[0]) {
            formData.set(fieldElement.dataset.wfhsfieldname || '', fieldElement.files[0]);
          }
        } else if (fieldElement.type === 'checkbox') {
          if (fieldElement.checked) {
            formData.set(fieldElement.dataset.wfhsfieldname || '', fieldElement.value);
          }
        } else if (fieldElement.type === 'radio') {
          if (fieldElement.checked) {
            formData.set(fieldElement.dataset.wfhsfieldname || '', fieldElement.value);
          }
        } else {
          formData.set(fieldElement.dataset.wfhsfieldname || '', fieldElement.value);
        }
      });

      try {
        const response = await fetch(form.dataset.webflowHubspotApiFormUrl || '', {
          method: "POST",
          body: formData,
        });
        
        const data = await response.json();
        console.log('Form submission response:', data);
      } catch (error) {
        console.error('Webflow form submission error:', error);
      }
    });
  }
}

// 페이지 로드 시 HubSpot 통합 초기화
if (typeof window !== 'undefined') {
  window.addEventListener("load", () => {
    new HubSpotFormIntegration();
  });
}

export default HubSpotFormIntegration; 