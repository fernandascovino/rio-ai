import React from 'react';
import type { Model } from '../../types';

interface DetailSpecsProps {
  model: Model;
}

const SpecItem: React.FC<{ label: string; value?: string | string[] }> = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-prose-light">{label}</dt>
      <dd className="mt-1 text-sm text-prose sm:col-span-2 sm:mt-0">
        {Array.isArray(value) ? (
          <ul className="list-disc list-inside">
            {value.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          value
        )}
      </dd>
    </div>
  );
};

export const DetailSpecs: React.FC<DetailSpecsProps> = ({ model }) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <h3 className="text-lg font-semibold text-prose p-4 border-b border-slate-200">Especificações</h3>
      <div className="px-4 divide-y divide-slate-200">
        <SpecItem label="Modelo Base" value={model.baseModel} />
        <SpecItem label="Parâmetros" value={model.parameters} />
        <SpecItem label="Licença" value={model.license} />
        <SpecItem label="Datasets" value={model.datasets} />
      </div>
    </div>
  );
};
