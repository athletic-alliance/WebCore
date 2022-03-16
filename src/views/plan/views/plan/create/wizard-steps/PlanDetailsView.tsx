import React from 'react'
import DatePicker from 'react-datepicker'

type PlanDetailsViewProps = {
    planName: string
    startDate: Date
    endDate: Date
    nameChanged: (name: string) => void
    startDateChanged: (startDate: Date) => void
    endDateChanged: (endDate: Date) => void
}

export const PlanDetailsView = ({
    planName,
    startDate,
    endDate,
    nameChanged,
    startDateChanged,
    endDateChanged,
}: PlanDetailsViewProps): JSX.Element => {
    return (
        <div>
            <h1 className="mb-4 text-2xl">Details des Plans</h1>
            <div className="mb-5">
                <label
                    htmlFor="plan-name"
                    className="block font-medium text-gray-700 text-sm"
                >
                    Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                        onChange={(e: any) => nameChanged(e.target.value)}
                        value={planName}
                        type="text"
                        name="plan-name"
                        id="plan-name"
                        className="block w-full rounded-sm border-slate-300 focus:border-slate-500 focus:ring-0 sm:text-sm"
                        placeholder="Name des Plans"
                    />
                </div>
            </div>
            <div className="flex">
                <div className="mr-5">
                    <label
                        htmlFor="plan-name"
                        className="block font-medium text-gray-700 text-sm "
                    >
                        Startdatum
                    </label>
                    <DatePicker
                        selected={startDate}
                        nextMonthButtonLabel=">"
                        previousMonthButtonLabel="<"
                        locale="de"
                        dateFormat="dd.MM.yyyy"
                        onChange={(update: Date) => {
                            startDateChanged(update)
                        }}
                        isClearable
                    />
                </div>
                <div>
                    <label
                        htmlFor="plan-name"
                        className="block font-medium text-gray-700 text-sm"
                    >
                        Enddatum
                    </label>
                    <DatePicker
                        selected={endDate}
                        nextMonthButtonLabel=">"
                        previousMonthButtonLabel="<"
                        locale="de"
                        dateFormat="dd.MM.yyyy"
                        onChange={(update: Date) => {
                            endDateChanged(update)
                        }}
                        isClearable
                    />
                </div>
            </div>
        </div>
    )
}
