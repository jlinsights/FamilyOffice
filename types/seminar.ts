import { LucideIcon } from "lucide-react";

export interface Seminar {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  speaker: Speaker;
  date: string;
  time: string;
  duration: string;
  location: SeminarLocation;
  category: SeminarCategory;
  targetAudience: string[];
  capacity: number;
  registeredCount: number;
  price: number;
  isPremium: boolean;
  status: SeminarStatus;
  tags: string[];
  agenda: AgendaItem[];
  materials?: string[];
  image?: string;
  registrationUrl?: string;
  detailsUrl?: string;
  videoUrl?: string;
  presentationUrl?: string;
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  expertise: string[];
  image?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface SeminarLocation {
  type: "online" | "offline" | "hybrid";
  venue?: string;
  address?: string;
  onlineLink?: string;
  capacity?: number;
}

export interface AgendaItem {
  time: string;
  title: string;
  description?: string;
  speaker?: string;
  duration: number; // minutes
}

export type SeminarCategory = 
  | "leadership"
  | "finance" 
  | "legal"
  | "succession"
  | "investment"
  | "taxation"
  | "management"
  | "networking"
  | "technology"
  | "esg";

export type SeminarStatus = 
  | "upcoming"
  | "ongoing" 
  | "completed"
  | "cancelled"
  | "full";

export interface SeminarCategoryInfo {
  key: SeminarCategory;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export interface SeminarRegistration {
  seminarId: string;
  participantName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  industry: string;
  experience: string;
  expectations?: string;
  dietaryRestrictions?: string;
  accessibilityNeeds?: string;
  registrationDate: string;
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  attendanceStatus: "registered" | "attended" | "no-show" | "cancelled";
}

export interface SeminarFeedback {
  seminarId: string;
  participantEmail: string;
  rating: number; // 1-5
  contentRating: number;
  speakerRating: number;
  organizationRating: number;
  comments: string;
  wouldRecommend: boolean;
  suggestions?: string;
  submissionDate: string;
}

export interface SeminarSeries {
  id: string;
  name: string;
  description: string;
  seminars: Seminar[];
  totalSeminars: number;
  completedSeminars: number;
  nextSeminar?: Seminar;
  registrationUrl?: string;
}