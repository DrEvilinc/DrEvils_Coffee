import { Hero } from '../components/Hero';
import { HalloweenMarqueeSection } from '../components/HalloweenMarqueeSection';
import { ThirdAct } from '../components/ThirdAct';
import { Legacy } from '../components/Legacy';
import { TheLab } from '../components/TheLab';
// import { LabReportPreview } from '../components/LabReportPreview';
import { SpectacleSection } from '../components/SpectacleSection';
import { WaitlistSection } from '../components/WaitlistSection';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export function Home() {
  useDocumentMeta({
    title: "Dr. Evil's Coffee Laboratory — Roasted-to-Order Specialty Coffee",
    description:
      'American precision roasting house. Small-batch single-origin coffee, roasted to order — choose Light, House, or Dark and your grind. Awaken the beast, one cup at a time.',
    path: '/',
  });

  return (
    <>
      <Hero />
      <HalloweenMarqueeSection />
      <ThirdAct />
      <Legacy />
      <TheLab />
      {/* <LabReportPreview /> */}
      <SpectacleSection />
      <WaitlistSection />
    </>
  );
}