import { Hero } from '../components/Hero';
import { ThirdAct } from '../components/ThirdAct';
import { Legacy } from '../components/Legacy';
import { TheLab } from '../components/TheLab';
// import { LabReportPreview } from '../components/LabReportPreview';
import { SpectacleSection } from '../components/SpectacleSection';
import { WaitlistSection } from '../components/WaitlistSection';

export function Home() {
  return (
    <>
      <Hero />
      <ThirdAct />
      <Legacy />
      <TheLab />
      {/* <LabReportPreview /> */}
      <SpectacleSection />
      <WaitlistSection />
    </>
  );
}