interface TotalIncomeFilterProps {
    options: string[]; 
    selectedTimeRange: string;
    onSelectFilter: (selectedOption: string) => void; 
}
export const TotalIncomeFilter = ({
    options,
    selectedTimeRange,
    onSelectFilter,
}: TotalIncomeFilterProps) => {
    return (
        <div>
            {options.map((option) => (
                <button
                    key={option}
                    className={`btn btn-${selectedTimeRange === option ? 'primary' : 'secondary'}`}
                    onClick={() => onSelectFilter(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};