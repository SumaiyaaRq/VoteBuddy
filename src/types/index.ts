/**
 * Shared Type Definitions for VoteBuddy
 */

export interface UserProfile {
  fullName: string;
  age: string;
  city: string;
  state: string;
  voterId: string;
  hasVotedLastElection: boolean;
  registrationStatus: "active" | "pending" | "not_registered";
  locationMethod: "gps" | "manual" | null;
}

export interface Election {
  id: string;
  title: string;
  date: string;
  type: "Local" | "State" | "National";
  location: string;
  status: string;
  registrationDeadline: string;
  officialLink?: string;
  description?: string;
}

export interface PollingStation {
  id: string;
  name: string;
  address: string;
  distance: string;
  isOpen: boolean;
  coordinates?: { lat: number; lng: number };
}

export interface AssistantMessage {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
  quickActions?: string[];
}

export interface JourneyStep {
  id: number;
  title: string;
  description: string;
  status: "pending" | "current" | "completed";
}
