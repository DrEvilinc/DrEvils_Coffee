import { Fingerprint, Beaker, ThermometerSun, Clock } from 'lucide-react';

interface LabReportCardProps {
  batchName?: string;
  origin?: string;
  roastDate?: string;
  roastProfile?: string;
  dropTemp?: string;
  duration?: string;
  developmentRatio?: string;
}

export function LabReportCard({
  batchName = "PROTOCOL: KINETIC",
  origin = "Ethiopia, Yirgacheffe",
  roastDate = "2026.02.09 14:32",
  roastProfile = "ROEST-2401A",
  dropTemp = "210°C",
  duration = "11:45",
  developmentRatio = "18.5%"
}: LabReportCardProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Front Side */}
      <div className="bg-black border-2 border-zinc-700 p-8 mb-8 font-mono">
        {/* Header */}
        <div className="border-b border-zinc-700 pb-4 mb-6">
          <h2 className="text-zinc-400 text-xs tracking-widest mb-2">DR. EVIL'S COFFEE LABORATORY</h2>
          <h1 className="text-white text-xl tracking-wider">SPECIMEN LOG</h1>
        </div>

        {/* Specimen Data */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <Fingerprint className="w-5 h-5 text-zinc-500 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-zinc-500 text-xs mb-1">SPECIMEN ID</p>
              <p className="text-white text-sm tracking-wide">{batchName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Beaker className="w-5 h-5 text-zinc-500 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-zinc-500 text-xs mb-1">SUBJECT ORIGIN</p>
              <p className="text-white text-sm tracking-wide">{origin}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-zinc-500 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-zinc-500 text-xs mb-1">ROAST TIMESTAMP</p>
              <p className="text-white text-sm tracking-wide">{roastDate}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ThermometerSun className="w-5 h-5 text-zinc-500 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-zinc-500 text-xs mb-1">ROAST PROFILE</p>
              <p className="text-white text-sm tracking-wide">{roastProfile}</p>
            </div>
          </div>
        </div>

        {/* Signature Line */}
        <div className="border-t border-zinc-700 pt-4 mb-6">
          <p className="text-zinc-500 text-xs mb-2">OPERATOR SIGNATURE</p>
          <div className="border-b border-zinc-600 h-8"></div>
        </div>

        {/* Footer Quote */}
        <div className="text-center border-t border-zinc-700 pt-4">
          <p className="text-zinc-400 text-xs italic tracking-wide">
            "Precision is the difference between a cup and a cure."
          </p>
        </div>
      </div>

      {/* Back Side */}
      <div className="bg-black border-2 border-zinc-700 p-8 font-mono">
        {/* Thermal Data Header */}
        <div className="border-b border-zinc-700 pb-4 mb-6">
          <h2 className="text-white text-lg tracking-wider">THERMAL PERFORMANCE DATA</h2>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-zinc-500 text-xs mb-2">DROP TEMP</p>
            <p className="text-white text-2xl font-light">{dropTemp}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs mb-2">ROAST DURATION</p>
            <p className="text-white text-2xl font-light">{duration}</p>
          </div>
          <div className="col-span-2">
            <p className="text-zinc-500 text-xs mb-2">DEVELOPMENT RATIO</p>
            <p className="text-white text-2xl font-light">{developmentRatio}</p>
          </div>
        </div>

        {/* Sensory Calibration */}
        <div className="border-t border-zinc-700 pt-6 mb-6">
          <h3 className="text-white text-sm tracking-wider mb-4">SENSORY CALIBRATION</h3>
          
          {/* Simple bar chart representation */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-zinc-500 mb-1">
                <span>ACIDITY</span>
                <span>8.5</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-400 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-zinc-500 mb-1">
                <span>BODY</span>
                <span>7.0</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-400 rounded-full" style={{width: '70%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-zinc-500 mb-1">
                <span>SWEETNESS</span>
                <span>9.0</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-400 rounded-full" style={{width: '90%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Placeholder */}
        <div className="border-t border-zinc-700 pt-6 flex items-center justify-between">
          <div>
            <p className="text-zinc-500 text-xs mb-1">BIRTH PROFILE</p>
            <p className="text-white text-xs">Scan to watch roast</p>
          </div>
          <div className="w-16 h-16 bg-zinc-800 border border-zinc-600 flex items-center justify-center">
            <div className="grid grid-cols-4 gap-px">
              {Array.from({length: 16}).map((_, i) => (
                <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-white' : 'bg-zinc-800'}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
