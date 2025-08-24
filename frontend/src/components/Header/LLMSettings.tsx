import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Slider } from "../ui/slider";

type LLMSettingsProps = {
  llmSettings: LLMSettings;
  setLLMSettings: SetState<LLMSettings>;
};

export function LLMSettings({ llmSettings, setLLMSettings }: LLMSettingsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 border-blue-200 bg-transparent"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4" align="end">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              LLM Parameters
            </h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature" className="text-sm text-gray-700">
                Temperature
              </Label>
              <span className="text-sm text-gray-500 font-mono">
                {llmSettings.temperature.toFixed(2)}
              </span>
            </div>
            <Slider
              id="temperature"
              min={0}
              max={2}
              step={0.1}
              value={[llmSettings.temperature]}
              onValueChange={(value: any) =>
                setLLMSettings((prev) => ({
                  ...prev,
                  temperature: value[0],
                }))
              }
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Controls randomness. Lower = more focused, Higher = more creative
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="nucleus" className="text-sm text-gray-700">
                Nucleus Sampling (Top-p)
              </Label>
              <span className="text-sm text-gray-500 font-mono">
                {llmSettings.nucleusSampling.toFixed(2)}
              </span>
            </div>
            <Slider
              id="nucleus"
              min={0.1}
              max={1}
              step={0.05}
              value={[llmSettings.nucleusSampling]}
              onValueChange={(value: any) =>
                setLLMSettings((prev) => ({
                  ...prev,
                  nucleusSampling: value[0],
                }))
              }
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Controls diversity. Lower = more deterministic, Higher = more
              varied
            </p>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
