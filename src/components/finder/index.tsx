import * as React from 'react';
import { Button, IButtonState } from '../button';
import { Select, ISelectState } from '../select';
import { Moment } from 'moment';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

import './index.css';

interface DateRange {
    startDate: Moment;
    endDate: Moment;
}

interface Props {
    isLoading: boolean;
    destination: any;
    dateRange: DateRange;
    update: (prop: string, value: any) => void;
    search: () => void;
}

interface State {
    dateRangeFocused: 'startDate' | 'endDate' | null;
}

class Finder extends React.Component<Props, State> {
    constructor() {
        super();

        this.state = {
            dateRangeFocused: null
        };

        this.handleDestinationChange = this.handleDestinationChange.bind(this);
        this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
        this.handleDateRangeFocusChange = this.handleDateRangeFocusChange.bind(this);
    }

    handleDestinationChange = (selectedDestination: any) => {
        this.props.update('destination', this.retrieveJson());
    }

    handleDateRangeChange = (startDate: Moment, endDate: Moment) => {
        this.props.update('dateRange', { startDate: startDate, endDate: endDate });
    }

    handleDateRangeFocusChange = (focusedInput: 'startDate' | 'endDate' | null) => {
        this.setState({
            dateRangeFocused: focusedInput
        });
    }

    retrieveJson = () => {
        return {
            'label': 'Canada',
            'type': 'Polygon',
            'coordinates': [
                [
                    [
                        -71.52786254882812,
                        46.71632714994794
                    ],
                    [
                        -71.08840942382812,
                        46.71632714994794
                    ],
                    [
                        -71.08840942382812,
                        46.948387301863534
                    ],
                    [
                        -71.52786254882812,
                        46.948387301863534
                    ],
                    [
                        -71.52786254882812,
                        46.71632714994794
                    ]
                ]
            ]
        };
    }

    render() {
        return (
            <div className='finder'>
                <div className='finder-grid-container'>
                    <Select
                        className='destination'
                        value={this.props.destination.label}
                        placeholder='Destionation / Country / City'
                        state={ISelectState.default}
                        searchable={true}
                        clearable={false}
                        onChange={this.handleDestinationChange}
                        options={[
                            { value: 'Canada', label: 'Canada' },
                            { value: 'United-States', label: 'United-States' },
                            { value: 'Mexico', label: 'Mexico' },
                            { value: 'Colombia', label: 'Colombia' },
                            { value: 'France', label: 'France' },
                            { value: 'Argentina', label: 'Argentina' },

                        ]}
                    />
                    <DateRangePicker
                        startDate={this.props.dateRange.startDate}
                        startDateId='START_DATE'
                        endDate={this.props.dateRange.endDate}
                        endDateId='END_DATE'
                        onDatesChange={({ startDate, endDate }: any) => this.handleDateRangeChange(startDate, endDate)}
                        focusedInput={this.state.dateRangeFocused}
                        onFocusChange={(focusedInput: 'startDate' | 'endDate' | null) => this.handleDateRangeFocusChange(focusedInput)}
                    />
                    <Button className='book-button' text='Search' state={IButtonState.default} action={this.props.search} isLoading={this.props.isLoading} />
                </div>
            </div>
        );
    }
}

export default Finder;