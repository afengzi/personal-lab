import { CosmosScreen } from "@/components/CosmosScreen";
import { LocaleToggle } from "@/components/LocaleToggle";

export default function Home() {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <CosmosScreen />
      <div style={{ position: "fixed", top: 24, right: 24, zIndex: 70 }}>
        <LocaleToggle />
      </div>
    </div>
  );
}
