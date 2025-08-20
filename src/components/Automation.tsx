import { useAutomation } from "@/services/hooks/automation";
import { Button, Card } from "../styles/ui";

export function AutomationPage() {
  const { data: result, mutateAsync: runAutomation } = useAutomation();

  async function handleRun() {
    await runAutomation();
  }

  return (
    <Card>
      <h2>CSV Process Automation</h2>

      <div style={{ display: "flex", gap: 8 }}>
        <Button onClick={handleRun}>Run Now</Button>
      </div>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </Card>
  );
}
