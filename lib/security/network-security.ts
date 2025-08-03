export interface FirewallRule {
  id: string;
  name: string;
  type: 'allow' | 'deny';
  protocol: 'tcp' | 'udp' | 'icmp' | 'all';
  sourceIp: string;
  destinationIp: string;
  sourcePort?: number;
  destinationPort?: number;
  action: 'accept' | 'reject' | 'drop';
  priority: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  description: string;
}

export interface NetworkSegment {
  id: string;
  name: string;
  cidr: string;
  description: string;
  securityLevel: 'low' | 'medium' | 'high' | 'critical';
  allowedServices: string[];
  vpnRequired: boolean;
  mfaRequired: boolean;
  auditLogging: boolean;
}

export interface VPNConnection {
  id: string;
  userId: string;
  ipAddress: string;
  connectedAt: Date;
  lastActivity: Date;
  sessionId: string;
  location?: string;
  deviceInfo?: string;
  status: 'active' | 'disconnected' | 'expired';
}

export interface NetworkSecurityPolicy {
  id: string;
  name: string;
  description: string;
  rules: FirewallRule[];
  segments: NetworkSegment[];
  vpnConnections: VPNConnection[];
  monitoringEnabled: boolean;
  intrusionDetection: boolean;
  ddosProtection: boolean;
}

export class NetworkSecurityService {
  private firewallRules: FirewallRule[] = [];
  private networkSegments: NetworkSegment[] = [];
  private vpnConnections: VPNConnection[] = [];
  private securityPolicy!: NetworkSecurityPolicy;

  constructor() {
    this.initializeDefaultSecurityPolicy();
  }

  // 기본 보안 정책 초기화
  private initializeDefaultSecurityPolicy(): void {
    this.securityPolicy = {
      id: 'default-policy',
      name: 'Default Security Policy',
      description: '기본 네트워크 보안 정책',
      rules: this.getDefaultFirewallRules(),
      segments: this.getDefaultNetworkSegments(),
      vpnConnections: [],
      monitoringEnabled: true,
      intrusionDetection: true,
      ddosProtection: true,
    };
  }

  // 기본 방화벽 규칙
  private getDefaultFirewallRules(): FirewallRule[] {
    return [
      {
        id: 'allow-https',
        name: 'Allow HTTPS Traffic',
        type: 'allow',
        protocol: 'tcp',
        sourceIp: '0.0.0.0/0',
        destinationIp: '0.0.0.0/0',
        destinationPort: 443,
        action: 'accept',
        priority: 100,
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        description: 'HTTPS 트래픽 허용',
      },
      {
        id: 'allow-http',
        name: 'Allow HTTP Traffic',
        type: 'allow',
        protocol: 'tcp',
        sourceIp: '0.0.0.0/0',
        destinationIp: '0.0.0.0/0',
        destinationPort: 80,
        action: 'accept',
        priority: 101,
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        description: 'HTTP 트래픽 허용 (리다이렉트용)',
      },
      {
        id: 'deny-admin-ports',
        name: 'Deny Admin Ports',
        type: 'deny',
        protocol: 'tcp',
        sourceIp: '0.0.0.0/0',
        destinationIp: '0.0.0.0/0',
        destinationPort: 22,
        action: 'drop',
        priority: 200,
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        description: 'SSH 포트 차단',
      },
      {
        id: 'allow-api-internal',
        name: 'Allow API Internal Access',
        type: 'allow',
        protocol: 'tcp',
        sourceIp: '10.0.0.0/8',
        destinationIp: '0.0.0.0/0',
        destinationPort: 3001,
        action: 'accept',
        priority: 50,
        enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        description: '내부 API 접근 허용',
      },
    ];
  }

  // 기본 네트워크 세그먼트
  private getDefaultNetworkSegments(): NetworkSegment[] {
    return [
      {
        id: 'dmz',
        name: 'DMZ',
        cidr: '10.0.1.0/24',
        description: '외부 접근 가능한 서비스 영역',
        securityLevel: 'medium',
        allowedServices: ['web', 'api'],
        vpnRequired: false,
        mfaRequired: false,
        auditLogging: true,
      },
      {
        id: 'internal',
        name: 'Internal Network',
        cidr: '10.0.2.0/24',
        description: '내부 서비스 영역',
        securityLevel: 'high',
        allowedServices: ['database', 'cache', 'queue'],
        vpnRequired: true,
        mfaRequired: true,
        auditLogging: true,
      },
      {
        id: 'management',
        name: 'Management Network',
        cidr: '10.0.3.0/24',
        description: '관리 서비스 영역',
        securityLevel: 'critical',
        allowedServices: ['monitoring', 'logging', 'admin'],
        vpnRequired: true,
        mfaRequired: true,
        auditLogging: true,
      },
    ];
  }

  // 방화벽 규칙 추가
  addFirewallRule(
    rule: Omit<FirewallRule, 'id' | 'createdAt' | 'updatedAt'>
  ): FirewallRule {
    const newRule: FirewallRule = {
      ...rule,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.firewallRules.push(newRule);
    this.securityPolicy.rules.push(newRule);

    console.log('Added firewall rule:', newRule.name);
    return newRule;
  }

  // 방화벽 규칙 업데이트
  updateFirewallRule(
    ruleId: string,
    updates: Partial<FirewallRule>
  ): FirewallRule | null {
    const ruleIndex = this.firewallRules.findIndex(r => r.id === ruleId);

    if (ruleIndex === -1) {
      return null;
    }

    this.firewallRules[ruleIndex] = {
      ...this.firewallRules[ruleIndex],
      ...updates,
      updatedAt: new Date(),
    };

    console.log('Updated firewall rule:', ruleId);
    return this.firewallRules[ruleIndex];
  }

  // 방화벽 규칙 삭제
  deleteFirewallRule(ruleId: string): boolean {
    const ruleIndex = this.firewallRules.findIndex(r => r.id === ruleId);

    if (ruleIndex === -1) {
      return false;
    }

    this.firewallRules.splice(ruleIndex, 1);
    this.securityPolicy.rules = this.securityPolicy.rules.filter(
      r => r.id !== ruleId
    );

    console.log('Deleted firewall rule:', ruleId);
    return true;
  }

  // 네트워크 트래픽 검사
  checkTraffic(
    sourceIp: string,
    destinationIp: string,
    protocol: string,
    sourcePort?: number,
    destinationPort?: number
  ): { allowed: boolean; rule?: FirewallRule } {
    // 우선순위별로 규칙 검사
    const sortedRules = this.firewallRules
      .filter(r => r.enabled)
      .sort((a, b) => a.priority - b.priority);

    for (const rule of sortedRules) {
      if (
        this.matchesRule(
          rule,
          sourceIp,
          destinationIp,
          protocol,
          sourcePort,
          destinationPort
        )
      ) {
        return {
          allowed: rule.type === 'allow',
          rule,
        };
      }
    }

    // 기본 정책: 거부
    return { allowed: false };
  }

  // 규칙 매칭 확인
  private matchesRule(
    rule: FirewallRule,
    sourceIp: string,
    destinationIp: string,
    protocol: string,
    sourcePort?: number,
    destinationPort?: number
  ): boolean {
    // IP 주소 매칭
    if (
      !this.ipMatches(rule.sourceIp, sourceIp) ||
      !this.ipMatches(rule.destinationIp, destinationIp)
    ) {
      return false;
    }

    // 프로토콜 매칭
    if (rule.protocol !== 'all' && rule.protocol !== protocol) {
      return false;
    }

    // 포트 매칭
    if (rule.sourcePort && sourcePort && rule.sourcePort !== sourcePort) {
      return false;
    }

    if (
      rule.destinationPort &&
      destinationPort &&
      rule.destinationPort !== destinationPort
    ) {
      return false;
    }

    return true;
  }

  // IP 주소 매칭
  private ipMatches(cidr: string, ip: string): boolean {
    // 간단한 CIDR 매칭 (실제 구현에서는 더 정교한 로직 필요)
    if (cidr === '0.0.0.0/0') {
      return true;
    }

    const [network, bits] = cidr.split('/');
    const networkParts = network.split('.').map(Number);
    const ipParts = ip.split('.').map(Number);

    const mask = parseInt(bits);
    const networkMask = (1 << (32 - mask)) - 1;

    for (let i = 0; i < 4; i++) {
      if ((networkParts[i] & networkMask) !== (ipParts[i] & networkMask)) {
        return false;
      }
    }

    return true;
  }

  // VPN 연결 생성
  createVPNConnection(
    userId: string,
    ipAddress: string,
    deviceInfo?: string
  ): VPNConnection {
    const connection: VPNConnection = {
      id: crypto.randomUUID(),
      userId,
      ipAddress,
      connectedAt: new Date(),
      lastActivity: new Date(),
      sessionId: crypto.randomUUID(),
      deviceInfo,
      status: 'active',
    };

    this.vpnConnections.push(connection);
    this.securityPolicy.vpnConnections.push(connection);

    console.log('Created VPN connection for user:', userId);
    return connection;
  }

  // VPN 연결 업데이트
  updateVPNConnection(
    connectionId: string,
    updates: Partial<VPNConnection>
  ): VPNConnection | null {
    const connectionIndex = this.vpnConnections.findIndex(
      c => c.id === connectionId
    );

    if (connectionIndex === -1) {
      return null;
    }

    this.vpnConnections[connectionIndex] = {
      ...this.vpnConnections[connectionIndex],
      ...updates,
      lastActivity: new Date(),
    };

    console.log('Updated VPN connection:', connectionId);
    return this.vpnConnections[connectionIndex];
  }

  // VPN 연결 종료
  disconnectVPN(connectionId: string): boolean {
    const connection = this.vpnConnections.find(c => c.id === connectionId);

    if (!connection) {
      return false;
    }

    connection.status = 'disconnected';
    connection.lastActivity = new Date();

    console.log('Disconnected VPN connection:', connectionId);
    return true;
  }

  // 네트워크 보안 모니터링
  monitorNetworkSecurity(): NetworkSecurityReport {
    const activeConnections = this.vpnConnections.filter(
      c => c.status === 'active'
    );
    const blockedAttempts = this.getBlockedAttempts();
    const securityAlerts = this.getSecurityAlerts();

    return {
      timestamp: new Date(),
      activeVPNConnections: activeConnections.length,
      blockedAttempts: blockedAttempts.length,
      securityAlerts: securityAlerts.length,
      firewallRules: this.firewallRules.filter(r => r.enabled).length,
      networkSegments: this.networkSegments.length,
      riskLevel: this.calculateRiskLevel(
        activeConnections,
        blockedAttempts,
        securityAlerts
      ),
    };
  }

  // 차단된 접근 시도 가져오기
  private getBlockedAttempts(): any[] {
    return []; // 구현 필요
  }

  // 보안 경고 가져오기
  private getSecurityAlerts(): any[] {
    return []; // 구현 필요
  }

  // 위험도 계산
  private calculateRiskLevel(
    activeConnections: VPNConnection[],
    blockedAttempts: any[],
    securityAlerts: any[]
  ): 'low' | 'medium' | 'high' | 'critical' {
    const connectionScore = activeConnections.length * 10;
    const blockedScore = blockedAttempts.length * 5;
    const alertScore = securityAlerts.length * 20;

    const totalScore = connectionScore + blockedScore + alertScore;

    if (totalScore > 100) return 'critical';
    if (totalScore > 50) return 'high';
    if (totalScore > 20) return 'medium';
    return 'low';
  }

  // DDoS 보호 활성화
  enableDDoSProtection(): void {
    this.securityPolicy.ddosProtection = true;
    console.log('DDoS protection enabled');
  }

  // 침입 탐지 활성화
  enableIntrusionDetection(): void {
    this.securityPolicy.intrusionDetection = true;
    console.log('Intrusion detection enabled');
  }

  // 네트워크 보안 정책 가져오기
  getSecurityPolicy(): NetworkSecurityPolicy {
    return this.securityPolicy;
  }
}

export interface NetworkSecurityReport {
  timestamp: Date;
  activeVPNConnections: number;
  blockedAttempts: number;
  securityAlerts: number;
  firewallRules: number;
  networkSegments: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}
