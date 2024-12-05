import { StoreProvider } from "@/app/_store/StoreContext";
import { ISpell } from "../../_types/ISpell";
import { API_URL } from "../../../variable.env";
import Dashboard from "./Dashboard";

export default async function Page() {
  let spellList: ISpell[] = [];

  try {
    const res = await fetch(`${API_URL}/sample`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch spells:", res.status, res.statusText);
    } else {
      spellList = await res.json();
      console.log("Fetched spellList:", spellList);
    }
  } catch (error) {
    console.error("Error fetching spells:", error);
  }

  return (
    <StoreProvider initialSpellList={spellList}>
      <Dashboard />
    </StoreProvider>
  );
}
