import React from 'react';
import { UserX, Car, Activity, Droplet, Flame, Wind, ShieldAlert, CreditCard, Smartphone, Shield, AlertTriangle } from 'lucide-react';

// One place that turns a guide's icon name into an icon, used by every list and page.
const ICONS: Record<string, React.ElementType> = {
  UserX,
  Car,
  Activity,
  Droplet,
  Flame,
  Wind,
  ShieldAlert,
  CreditCard,
  Smartphone,
  Shield,
};

export const ScenarioIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  const Icon = ICONS[name] ?? AlertTriangle;
  return <Icon className={className} />;
};
