import React from 'react';


interface Props<T>
{
    elements : () => Generator<T>,
    Identifiers?: string[];
    render: (element: T) => JSX.Element;
}

export function DynamicTable<T>({ elements, Identifiers, render }: Props<T>) : JSX.Element
{
    return (
        <div>
            <table>
                <thead>
                    {createHeader()}
                </thead>
                <tbody>
                    {createTableBody()}
                </tbody>
            </table>
        </div>
    );


    function createHeader() : JSX.Element
    {
        return (
            <tr>
                {Identifiers?.map((identifier, index) => <th key={index}>{identifier}</th>)}
            </tr>
        );
    }

    function createTableBody() : JSX.Element[]
    {
        return [...elements()].map(createRow);
    }

    function createRow(element : T, index : number) : JSX.Element
    {
        return (
            <React.Fragment key={index}>
                {render(element)}
            </React.Fragment>
        );
    }
}
