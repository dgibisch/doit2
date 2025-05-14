/**
 * Globale TypeScript-Definitionen für die gesamte Anwendung
 * 
 * Diese Datei sammelt alle globalen TypeScript-Definitionen an einem zentralen Ort,
 * um Konflikte zu vermeiden und die Kohärenz der Typendefinitionen sicherzustellen.
 */

/**
 * Erweiterung der Window-Schnittstelle für globale Objekte und Callbacks
 */
interface Window {
  // Google Maps API
  google?: typeof google;
  googleMapsLoaded?: boolean;
  initGoogleMapsCallback?: () => void;
  
  // Firebase
  firebaseApp?: import('firebase/app').FirebaseApp;
}

/**
 * User-Definitionen für die gesamte Anwendung
 */
declare interface User {
  uid: string;
  id?: string; // Kompatibilität für ältere Komponenten
  email: string;
  displayName: string;
  name?: string; // Kompatibilität für ältere Komponenten
  photoURL: string | null | undefined;
  avatarUrl?: string; // Für Benutzerprofilbilder aus Firestore
  avatarBase64?: string; // Für Base64-kodierte Benutzerprofilbilder
}

declare interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null | undefined;
  avatarUrl?: string; // Für Benutzerprofilbilder aus Firestore
  avatarBase64?: string; // Für Base64-kodierte Benutzerprofilbilder
  completedTasks: number;
  postedTasks: number;
  rating: number;
  ratingCount: number;
  skills: string[];
  location?: string;
  locationCoordinates?: { lat: number; lng: number };
  locationSource?: string;
  level?: string;
  bio?: string;
  bookmarkedTasks?: string[];
  unreadNotifications?: number; // Anzahl der ungelesenen Benachrichtigungen
  createdAt?: any;
  updatedAt?: any;
}

declare interface LocationData {
  address: string;
  lat: number;
  lng: number;
}

declare interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  status: string;
  // Beide Varianten der Standortdaten unterstützen
  location?: string | { 
    coordinates: { lat: number; lng: number };
    address?: string;
    city?: string;
  };
  locationCoordinates?: { lat: number; lng: number };
  creatorId: string;
  creatorName?: string;
  creatorPhotoURL?: string;
  creatorRating?: number;
  assignedUserId?: string;
  taskerId?: string; // Kompatibilität: manche Teile nutzen taskerId statt assignedUserId
  distance?: number; // Berechnete Entfernung zum Nutzer
  requirements?: string;
  images?: string[];
  imageUrls?: string[];
  imageUrl?: string;
  createdAt: any; // Firebase Timestamp
  updatedAt?: any; // Firebase Timestamp
  applications?: TaskApplication[];
  applicants?: TaskApplication[]; // Kompatibilität: manche Teile nutzen applicants statt applications
  timePreference?: string;
  timePreferenceDate?: any;
  // Zusätzliche Felder für verschiedene Ansichten
  timeInfo?: { 
    isFlexible: boolean;
    date?: Date | null;
    formattedDate?: string | null;
    timeOfDay?: string | null;
    displayText: string;
  } | string; // Formatierte Zeitinformation
  address?: string; // Formatierte Adresse
  area?: string; // Ortsteil/Stadtbezirk
  isLocationShared?: boolean; // Ob der genaue Standort freigegeben wurde
  selectedApplicant?: string; // ID des ausgewählten Bewerbers
  // Zusätzliche Felder für UI-Komponenten
  commentCount?: number; // Anzahl der Kommentare
}

declare interface UserTask extends Task {
  // Zusätzliche Eigenschaften für Aufgaben aus Benutzersicht
  distance?: number;
  distanceText?: string;
  applied?: boolean;
  bookmarked?: boolean;
}

declare interface TaskApplication {
  id: string;
  taskId: string;
  applicantId: string;
  applicantName?: string;
  applicantPhotoURL?: string;
  message: string;
  price: number;
  status: string;
  createdAt: any; // Firebase Timestamp
}

declare interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  text: string;
  createdAt: any; // Firebase Timestamp
  parentId?: string;
  replyCount?: number;
}

declare interface Chat {
  id: string;
  taskId: string;
  taskTitle?: string;
  participants: string[];
  lastMessage?: {
    text: string;
    senderId: string;
    timestamp: any;
  };
  createdAt: any;
  updatedAt?: any;
  status?: string;
}

declare interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: any;
  read?: boolean;
}

declare interface Review {
  id: string;
  userId: string;
  authorId: string;
  authorName?: string;
  authorPhotoURL?: string;
  taskId: string;
  taskTitle: string;
  rating: number;
  text: string;
  createdAt: any;
}

declare interface AppNotification {
  id: string;
  userId: string;
  type: string; // taskMatched, taskCompleted, reviewRequired, newMessage, etc.
  title?: string;
  message?: string;
  read: boolean;
  acted: boolean;
  priority?: 'high' | 'normal';
  data?: {
    taskId?: string;
    userId?: string;
    chatId?: string;
    reviewId?: string;
    applicationId?: string;
    [key: string]: any; // Erlaube andere dynamische Eigenschaften
  };
  createdAt: any; // Firebase Timestamp
}

/**
 * Google Maps Places Autocomplete-Typdefinitionen
 */
declare namespace google.maps.places {
  class Autocomplete extends google.maps.MVCObject {
    constructor(inputField: HTMLInputElement, opts?: google.maps.places.AutocompleteOptions);
    addListener(eventName: string, handler: Function): google.maps.MapsEventListener;
    getPlace(): google.maps.places.PlaceResult;
  }

  interface AutocompleteOptions {
    bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
    componentRestrictions?: { country: string | string[] };
    fields?: string[];
    types?: string[];
  }

  interface PlaceResult {
    address_components?: google.maps.GeocoderAddressComponent[];
    formatted_address?: string;
    geometry?: {
      location: google.maps.LatLng;
      viewport?: google.maps.LatLngBounds;
    };
    name?: string;
    types?: string[];
  }
}