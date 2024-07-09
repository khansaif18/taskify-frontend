import React, { useState } from 'react';

const AutoResizeTextarea = () => {
    const [rows, setRows] = useState(1);
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        const textareaLineHeight = 24;
        const previousRows = event.target.rows;
        event.target.rows = 1; // reset the number of rows in the textarea 

        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }

        setRows(currentRows);
        setValue(event.target.value);
    };

    return (
        <textarea
            rows={rows}
            value={value}
            placeholder={'Type here...'}
            className={'textarea'}
            onChange={handleChange}
            style={{ lineHeight: '24px', width:'300px' }}
        />
    );
};

export default AutoResizeTextarea;
