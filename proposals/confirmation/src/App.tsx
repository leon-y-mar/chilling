import { useEffect, useState } from 'react';
import { Chip } from '../../../components/Chip/Chip';
import { Button } from '../../../components/Button/Button';
import { ProposalA } from './proposals/A';
import { ProposalB } from './proposals/B';
import { ProposalC } from './proposals/C';
import { ProposalD } from './proposals/D';
import { ProposalE } from './proposals/E';
import { steps } from './data';

const PROPOSALS = [
  { id: 'a', label: 'A · Ticket', name: 'Ticket protagonista', why: 'El cupón como objeto físico, justo después del gracias.', C: ProposalA },
  { id: 'b', label: 'B · Dashboard', name: 'Dashboard de pedido', why: 'ETA gigante + stepper. El cupón acompaña fijo a la derecha.', C: ProposalB },
  { id: 'c', label: 'C · Recompensa', name: 'Momento recompensa', why: 'El cupón es el titular: "Ganaste S/ 10".', C: ProposalC },
  { id: 'd', label: 'D · Contrarreloj', name: 'Contrarreloj', why: 'Ahorro de hoy + cuenta regresiva del cupón.', C: ProposalD },
  { id: 'e', label: 'E · Recompra', name: 'Recompra guiada', why: 'Arma el próximo pedido y desbloquea el cupón en vivo.', C: ProposalE },
] as const;

const fromHash = () => {
  const h = window.location.hash.replace('#', '').toLowerCase();
  return PROPOSALS.some((p) => p.id === h) ? h : 'a';
};

export function App() {
  const [id, setId] = useState(fromHash);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const on = () => setId(fromHash());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const current = PROPOSALS.find((p) => p.id === id)!;
  const go = (next: string) => {
    window.location.hash = next;
    window.scrollTo({ top: 0 });
  };
  const P = current.C;
  return (
    <>
      <nav className="proto-bar" data-theme="dark" aria-label="Propuestas">
        <div className="cp-container proto-bar__inner">
          <p className="proto-bar__title">
            {current.name}
            <span>{current.why}</span>
          </p>
          <div className="proto-bar__chips" role="group" aria-label="Elegir propuesta">
            {PROPOSALS.map((p) => (
              <Chip key={p.id} label={p.label} selected={p.id === id} onClick={() => go(p.id)} />
            ))}
          </div>
          <div className="proto-bar__sim">
            <span>Estado: {steps[step]}</span>
            <Button variant="flat" color="ranch" size="small" onClick={() => setStep((s) => (s + 1) % steps.length)}>
              Avanzar estado
            </Button>
          </div>
        </div>
      </nav>
      <P step={step} />
    </>
  );
}
