import React from 'react';
import Select from './Select/Select';
import ListItem from './TestComponents/ListItem';

type Arr = {
    a: string;
}

type Todos = {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
};

const url = 'https://jsonplaceholder.typicode.com/todos';

const strings = [
    'test1',
    'test2',
    'test3',
    'test4',
]

const App: React.FC = () => {

    const [value, setValue] = React.useState<string[] | null>(null);

    const onChange = (item: string[] | null) => {
        setValue(item);
    };

    return (
        <div className="wrap">
            <div className="test">
                <Select<string>
                    multyselect={true}
                    filtering={true}
                    placeholder="Select some data"
                    value={value}
                    options={strings}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default App;
