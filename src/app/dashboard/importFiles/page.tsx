import ImportFiles from "@/app/ui/importFIles/importFIles";
import { ThemeProvider } from "@/app/context/ThemeProvider";

export default function LoginPage() {
  return (
    <main className="bg-white min-h-full">
      <ThemeProvider>
        <ImportFiles />
      </ThemeProvider>
    </main>
  );
}
