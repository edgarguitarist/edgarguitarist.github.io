export function PascalCase(str: string): string {
    return str === "linkedin"
      ? "LinkedIn"
      : str === "github"
      ? "GitHub"
      : str === "whatsapp"
      ? "WhatsApp"
      : str.includes("pdf")
      ? "Curriculum"
      : str.charAt(0).toUpperCase() + str.slice(1);
  }