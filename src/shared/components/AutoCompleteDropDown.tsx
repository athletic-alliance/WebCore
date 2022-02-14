import React, {useEffect, useRef, useState} from 'react';

type AutoCompleteProps = {
    options: any;
    value: any;
    onChange: (option: any) => void;
}

export const AutoCompleteDropDown: React.FC<AutoCompleteProps> = ({options, value, onChange}: AutoCompleteProps) => {
    const [showOptions, setShowOptions] = useState(false);
    const [cursor, setCursor] = useState(-1);
    const ref = useRef();

    const select = (option: any) => {
        onChange(option);
        setShowOptions(false);
    };

    const handleChange = (text: string) => {
        onChange(text);
        setCursor(-1);
        if (!showOptions) {
            setShowOptions(true);
        }
    };

    const filteredOptions = options.filter((option: any) => option.name.includes(value));

    const moveCursorDown = () => {
        if (cursor < filteredOptions.length - 1) {
            setCursor(c => c + 1);
        }
    };

    const moveCursorUp = () => {
        if (cursor > 0) {
            setCursor(c => c - 1);
        }
    };

    const handleNav = (e: any) => {
        switch (e.key) {
            case 'ArrowUp':
                moveCursorUp();
                break;
            case 'ArrowDown':
                moveCursorDown();
                break;
            case 'Enter':
                if (cursor >= 0 && cursor < filteredOptions.length) {
                    select(filteredOptions[cursor]);
                }
                break;
        }
    };

    useEffect(() => {
        const listener = (e: any) => {
            // @ts-ignore
            if (!ref.current?.contains(e.target)) {
                setShowOptions(false);
                setCursor(-1);
            } else {
                setShowOptions(true);
            }
        };

        document.addEventListener('click', listener);
        document.addEventListener('focusin', listener);
        return () => {
            document.removeEventListener('click', listener);
            document.removeEventListener('focusin', listener);
        };
    }, []);

    return (
        <React.Fragment>
            <div className="relative"
                // @ts-ignore
                 ref={ref}>
                <input type="text"
                       className="px-3 py-2 border border-gray-200 placeholder-blueGray-300 text-blueGray-600 relative rounded text-sm  outline-none focus:outline-none focus:ring-0 focus:border-tgim-yellow w-full"
                       value={value?.name}
                       onChange={e => handleChange(e.target.value)}
                       onFocus={() => setShowOptions(true)}
                       onKeyDown={handleNav}
                />

                <ul className={`absolute w-full rounded-lg shadow-lg ${!showOptions && 'hidden'} select-none z-50`}>
                    {filteredOptions.length > 0 ? filteredOptions.map((option: any, i: number, arr: any) => {
                        let className = 'bg-white p-3 px-4 cursor-pointer hover:bg-gray-100 text-sm';

                        if (i === 0)
                            className += 'rounded-t-lg';
                        else if (i === arr.length)
                            className += 'pt-1 pb-2 rounded-b-lg';
                        else if (i === 0 && arr.length === 1)
                            className += 'py-2 rounded-lg';
                        else
                            className += 'py-1';

                        if (cursor === i) {
                            className += ' bg-gray-100';
                        }

                        return <li className={className} key={i} onClick={() => select(option)}>
                            <div>
                                <div className="text-sm">{option?.name}</div>
                                <div className="text-gray-500 text-xs">{option?.description}</div>
                            </div>
                        </li>;
                    }) : <li className="bg-white px-4 py-2 text-gray-500">Keine Ergebnisse</li>}

                </ul>
            </div>
        </React.Fragment>);
};
