import { PortfolioData, defaultData } from "./data";

const STORAGE_KEY = "susmita_portfolio_data";

function mergePortfolioData(stored: Partial<PortfolioData>): PortfolioData {
  return {
    ...defaultData,
    ...stored,
    hero: { ...defaultData.hero, ...stored.hero },
    about: { ...defaultData.about, ...stored.about },
    media: { ...defaultData.media, ...stored.media },
    education: stored.education ?? defaultData.education,
    training: stored.training ?? defaultData.training,
    achievements: stored.achievements ?? defaultData.achievements,
  };
}

export function getPortfolioData(): PortfolioData {
  if (typeof window === "undefined") return defaultData;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultData;
    return mergePortfolioData(JSON.parse(stored) as Partial<PortfolioData>);
  } catch {
    return defaultData;
  }
}

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("admin_auth") === "true";
}

export function adminLogin(email: string, password: string): boolean {
  if (email === "susmitakhadka@gmail.com" && password === "susmita5834") {
    sessionStorage.setItem("admin_auth", "true");
    return true;
  }
  return false;
}

export function adminLogout(): void {
  sessionStorage.removeItem("admin_auth");
}
