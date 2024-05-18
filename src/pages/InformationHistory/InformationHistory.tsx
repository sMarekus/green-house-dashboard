import React, { useState, useEffect } from 'react';
import './InformationHistory.sass';

import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';

interface InformationHistoryProps {}

interface Measurement {
    id: number;
    type: string;
    date: string;
    value: number;
}

const MeasurementService = {
    getMeasurements: async (): Promise<Measurement[]> => {
        return [
            {
                id: 1,
                type: 'Heating',
                date: '2023-01-01',
                value: 25,
            },
            {
                id: 2,
                type: 'Lighting',
                date: '2023-02-01',
                value: 30,
            },
            {
                id: 3,
                type: 'Humidity',
                date: '2023-02-01',
                value: 30,
            },
            {
                id: 4,
                type: 'Windows',
                date: '2023-02-01',
                value: 30,
            },
            {
                id: 5,
                type: 'Windows',
                date: '2023-02-01',
                value: 30,
            },
            {
                id: 6,
                type: 'Windows',
                date: '2023-02-01',
                value: 30,
            },
            {
                id: 7,
                type: 'Windows',
                date: '2023-02-01',
                value: 30,
            },
            {
                id: 8,
                type: 'Windows',
                date: '2023-02-01',
                value: 30,
            },
            {
                id: 9,
                type: 'Windows',
                date: '2023-02-01',
                value: 30,
            },
        ];
    },
};

const InformationHistory: React.FC<InformationHistoryProps> = () => {
    
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        type: { value: null, matchMode: FilterMatchMode.IN },
        date: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const [types] = useState<string[]>(['Lighting', 'Heating', 'Humidity', 'Windows']);

    useEffect(() => {
        MeasurementService.getMeasurements().then((data: Measurement[]) => {
            setMeasurements(getMeasurements(data));
            setLoading(false);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getMeasurements = (data: Measurement[]) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date).toISOString();  // Converting date to string
            return d;
        });
    };

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

    const typeItemTemplate = (option: string) => {
        return <Tag value={option} />;
    };

    const typeRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <MultiSelect
                value={options.value}
                options={types}
                itemTemplate={typeItemTemplate}
                onChange={(e: MultiSelectChangeEvent) => options.filterApplyCallback(e.value)}
                placeholder="Select Types"
                className=""
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
                globalFilterFields={['type', 'date']} header={header} emptyMessage="No measurements found.">
                <Column field="type" header="Type" filterField="type" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                filter filterElement={typeRowFilterTemplate} />
                <Column field="date" header="Date" style={{ minWidth: '12rem' }} />
                <Column field="value" header="Value" style={{ minWidth: '12rem' }} />
            </DataTable>
        </div>
    );
};

export default InformationHistory;
