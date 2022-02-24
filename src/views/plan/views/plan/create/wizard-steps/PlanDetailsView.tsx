import React from 'react'
import DatePicker from 'react-datepicker';

type PlanDetailsViewProps = {
    planName: string;
    startDate: Date;
    endDate: Date;
    nameChanged: (name: string) => void;
    startDateChanged: (startDate: Date) => void;
    endDateChanged: (endDate: Date) => void;
}

export const PlanDetailsView = ({
                                    planName,
                                    startDate,
                                    endDate,
                                    nameChanged,
                                    startDateChanged,
                                    endDateChanged
                                }: PlanDetailsViewProps) => {

    return (<div>
        <h1 className={'text-2xl mb-4'}>Details des Plans</h1>
        <div className={'mb-5'}>
            <label htmlFor="plan-name" className="block text-sm font-medium text-gray-700">
                Name
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
                <input
                    onChange={(e: any) => nameChanged(e.target.value)}
                    value={planName}
                    type="text"
                    name="plan-name"
                    id="plan-name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-sm sm:text-sm border-gray-300"
                    placeholder="Name des Plans"
                />
            </div>
        </div>
        <div className={'flex'}>
            <div className={'mr-5'}>
                <label htmlFor="plan-name" className="block text-sm font-medium text-gray-700 ">
                    Startdatum
                </label>
                <DatePicker
                    selected={startDate}
                    nextMonthButtonLabel=">"
                    previousMonthButtonLabel="<"
                    locale="de"
                    dateFormat="dd.MM.yyyy"
                    onChange={(update: Date) => {
                        startDateChanged(update);
                    }}
                    isClearable={true}
                />
            </div>
            <div>
                <label htmlFor="plan-name" className="block text-sm font-medium text-gray-700">
                    Enddatum
                </label>
                <DatePicker
                    selected={endDate}
                    nextMonthButtonLabel=">"
                    previousMonthButtonLabel="<"
                    locale="de"
                    dateFormat="dd.MM.yyyy"
                    onChange={(update: Date) => {
                        endDateChanged(update);
                    }}
                    isClearable={true}
                />
            </div>
        </div>
    </div>)
}
