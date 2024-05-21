import React, { useState, useEffect } from 'react';
import './InformationHistory.sass';

import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { MeasurementService } from '../../api/Services/MeasurementService';
import { formatDate } from '../../utils/date';

interface Measurement {
  id: number | string;
  value: number;
  type: string;
  time: string;
}

const InformationHistory: React.FC = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.IN },
    time: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  const [types] = useState<string[]>(['Light', 'Temperature', 'Humidity']);

  useEffect(() => {
    setMeasurements([]);
    setLoading(true);
    MeasurementService.getMeasurements().then((data: Measurement[]) => {
      const filteredData = data.filter(measurement => 
        ['Light', 'Temperature', 'Humidity'].includes(measurement.type)
      ).map((measurement, index) => ({
        ...measurement,
        time: formatDate(measurement.time),
        id: measurement.id || `${measurement.type}-${measurement.time}-${index}`
      }));
      setMeasurements(filteredData);
      setLoading(false);
    }).catch(error => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    if ('value' in _filters['global']) {
      _filters['global'].value = value;
    }

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>
      </div>
    );
  };

  const typeRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <MultiSelect
        value={options.value}
        options={types}
        onChange={(e: MultiSelectChangeEvent) => options.filterApplyCallback(e.value)}
        placeholder="Select Types"
        maxSelectedLabels={1}
        style={{ minWidth: '14rem' }}
      />
    );
  };

  const header = renderHeader();

  return (
    <div className='pt-[100px] px-5 lg:pl-[272px] xl:pl-[344px] lg:pr-4 xl:pr-6'>
      <h1 className='font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl'>Information History</h1>

      <DataTable className='pt-3 md:pt-4 lg:pt-5 xl:pt-6 2xl:pt-8' value={measurements} paginator dataKey="id" rows={5} filters={filters} filterDisplay="row" loading={loading}
        globalFilterFields={['type', 'time']} header={header} emptyMessage="No measurements found.">
        <Column field="type" header="Type" filterField="type" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
          filter filterElement={typeRowFilterTemplate} />
        <Column field="time" header="Time" style={{ minWidth: '12rem' }} />
        <Column field="value" header="Value" style={{ minWidth: '12rem' }} />
      </DataTable>
    </div>
  );
};

export default InformationHistory;
