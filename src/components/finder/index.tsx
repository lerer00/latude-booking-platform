import * as React from 'react';
import { Button, IButtonState } from '../button';
import { Select, ISelectState } from '../select';
import { Moment } from 'moment';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

import './index.css';

export interface Destination {
    label: string;
    geojson: any;
}

interface DateRange {
    startDate: Moment;
    endDate: Moment;
}

interface Props {
    isLoading: boolean;
    destination: Destination;
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
        var destination: Destination = {
            label: selectedDestination.label,
            geojson: selectedDestination.geojson
        };
        this.props.update('destination', destination);
    }

    handleDateRangeChange = (startDate: Moment, endDate: Moment) => {
        this.props.update('dateRange', { startDate: startDate, endDate: endDate });
    }

    handleDateRangeFocusChange = (focusedInput: 'startDate' | 'endDate' | null) => {
        this.setState({
            dateRangeFocused: focusedInput
        });
    }

    render() {
        return (
            <div className='finder'>
                <div className='finder-grid-container'>
                    <Select
                        className='destination'
                        value={this.props.destination.label}
                        placeholder='Destination / Country / City'
                        state={ISelectState.default}
                        searchable={true}
                        clearable={false}
                        onChange={this.handleDestinationChange}
                        options={[
                            {
                                value: 'Canada',
                                label: 'Canada',
                                geojson: {
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
                                }
                            },
                            {
                                value: 'United-States',
                                label: 'United-States',
                                geojson: {
                                    'type': 'Polygon',
                                    'coordinates': [
                                        [
                                            [
                                                -124.45312499999999,
                                                48.22467264956519
                                            ],
                                            [
                                                -124.71679687499999,
                                                40.64730356252251
                                            ],
                                            [
                                                -120.58593749999999,
                                                34.379712580462204
                                            ],
                                            [
                                                -117.158203125,
                                                32.76880048488168
                                            ],
                                            [
                                                -111.796875,
                                                31.50362930577303
                                            ],
                                            [
                                                -107.314453125,
                                                32.10118973232094
                                            ],
                                            [
                                                -103.18359375,
                                                28.69058765425071
                                            ],
                                            [
                                                -101.77734374999999,
                                                30.14512718337613
                                            ],
                                            [
                                                -97.646484375,
                                                26.194876675795218
                                            ],
                                            [
                                                -81.03515625,
                                                24.926294766395593
                                            ],
                                            [
                                                -66.884765625,
                                                44.465151013519616
                                            ],
                                            [
                                                -68.37890625,
                                                47.39834920035926
                                            ],
                                            [
                                                -83.056640625,
                                                41.705728515237524
                                            ],
                                            [
                                                -82.08984375,
                                                45.336701909968134
                                            ],
                                            [
                                                -88.154296875,
                                                48.28319289548349
                                            ],
                                            [
                                                -95.2734375,
                                                48.980216985374994
                                            ],
                                            [
                                                -122.87109375,
                                                49.095452162534826
                                            ],
                                            [
                                                -124.45312499999999,
                                                48.22467264956519
                                            ]
                                        ]
                                    ]
                                }
                            },
                            {
                                value: 'Mexico',
                                label: 'Mexico',
                                geojson: {
                                    'type': 'Polygon',
                                    'coordinates': [
                                        [
                                            [
                                                -117.0703125,
                                                32.24997445586331
                                            ],
                                            [
                                                -109.6875,
                                                22.43134015636061
                                            ],
                                            [
                                                -95.185546875,
                                                14.859850400601037
                                            ],
                                            [
                                                -92.021484375,
                                                14.349547837185362
                                            ],
                                            [
                                                -91.845703125,
                                                16.130262012034756
                                            ],
                                            [
                                                -90.17578124999999,
                                                16.29905101458183
                                            ],
                                            [
                                                -91.318359375,
                                                17.308687886770034
                                            ],
                                            [
                                                -89.47265625,
                                                17.97873309555617
                                            ],
                                            [
                                                -88.17626953125,
                                                18.625424540701264
                                            ],
                                            [
                                                -86.37451171875,
                                                20.879342971957897
                                            ],
                                            [
                                                -86.923828125,
                                                21.983801417384697
                                            ],
                                            [
                                                -90.5712890625,
                                                21.105000275382064
                                            ],
                                            [
                                                -91.97753906249999,
                                                18.87510275035649
                                            ],
                                            [
                                                -94.59228515625,
                                                18.22935133838668
                                            ],
                                            [
                                                -97.18505859374999,
                                                26.07652055985697
                                            ],
                                            [
                                                -101.42578124999999,
                                                29.6880527498568
                                            ],
                                            [
                                                -103.53515625,
                                                28.613459424004414
                                            ],
                                            [
                                                -106.61132812499999,
                                                31.50362930577303
                                            ],
                                            [
                                                -111.09374999999999,
                                                31.353636941500987
                                            ],
                                            [
                                                -114.9609375,
                                                32.91648534731439
                                            ],
                                            [
                                                -117.0703125,
                                                32.24997445586331
                                            ]
                                        ]
                                    ]
                                }
                            },
                            {
                                value: 'Colombia',
                                label: 'Colombia',
                                geojson: {
                                    'type': 'Polygon',
                                    'coordinates': [
                                        [
                                            [
                                                -77.16796875,
                                                8.581021215641854
                                            ],
                                            [
                                                -77.87109375,
                                                7.231698708367139
                                            ],
                                            [
                                                -79.013671875,
                                                1.4939713066293239
                                            ],
                                            [
                                                -70.048828125,
                                                -4.214943141390639
                                            ],
                                            [
                                                -69.697265625,
                                                1.6696855009865839
                                            ],
                                            [
                                                -66.6650390625,
                                                1.0546279422758869
                                            ],
                                            [
                                                -67.3681640625,
                                                6.402648405963896
                                            ],
                                            [
                                                -73.388671875,
                                                9.275622176792112
                                            ],
                                            [
                                                -70.927734375,
                                                12.12526421833159
                                            ],
                                            [
                                                -71.8505859375,
                                                13.025965926333539
                                            ],
                                            [
                                                -76.1572265625,
                                                10.487811882056695
                                            ],
                                            [
                                                -77.16796875,
                                                8.581021215641854
                                            ]
                                        ]
                                    ]
                                }
                            },
                            {
                                value: 'France',
                                label: 'France',
                                geojson: {
                                    'type': 'Polygon',
                                    'coordinates': [
                                        [
                                            [
                                                -5.3173828125,
                                                48.61838518688487
                                            ],
                                            [
                                                -1.9555664062500002,
                                                43.40504748787035
                                            ],
                                            [
                                                -0.5712890625,
                                                42.827638636242284
                                            ],
                                            [
                                                1.9116210937499998,
                                                42.342305278572816
                                            ],
                                            [
                                                3.251953125,
                                                42.407234661551875
                                            ],
                                            [
                                                5.185546875,
                                                42.45588764197166
                                            ],
                                            [
                                                7.62451171875,
                                                43.58039085560784
                                            ],
                                            [
                                                7.75634765625,
                                                44.19795903948531
                                            ],
                                            [
                                                6.9873046875,
                                                44.32384807250689
                                            ],
                                            [
                                                7.163085937499999,
                                                44.793530904744074
                                            ],
                                            [
                                                6.65771484375,
                                                45.042478050891546
                                            ],
                                            [
                                                7.27294921875,
                                                45.29034662473613
                                            ],
                                            [
                                                6.87744140625,
                                                45.73685954736049
                                            ],
                                            [
                                                7.14111328125,
                                                45.90529985724799
                                            ],
                                            [
                                                6.8115234375,
                                                46.40756396630067
                                            ],
                                            [
                                                6.064453125,
                                                46.51351558059737
                                            ],
                                            [
                                                7.62451171875,
                                                47.41322033016902
                                            ],
                                            [
                                                8.3056640625,
                                                48.951366470947725
                                            ],
                                            [
                                                5.712890625,
                                                49.52520834197442
                                            ],
                                            [
                                                4.32861328125,
                                                49.96535590991311
                                            ],
                                            [
                                                3.779296875,
                                                50.317408112618686
                                            ],
                                            [
                                                2.4609375,
                                                51.2206474303833
                                            ],
                                            [
                                                -2.57080078125,
                                                49.82380908513249
                                            ],
                                            [
                                                -5.3173828125,
                                                48.61838518688487
                                            ]
                                        ]
                                    ]
                                }
                            },
                            {
                                value: 'Spain',
                                label: 'Spain',
                                geojson: {
                                    'type': 'Polygon',
                                    'coordinates': [
                                        [
                                            [
                                                -9.0087890625,
                                                41.86956082699455
                                            ],
                                            [
                                                -5.95458984375,
                                                41.705728515237524
                                            ],
                                            [
                                                -7.404785156249999,
                                                37.142803443716836
                                            ],
                                            [
                                                -5.44921875,
                                                35.88905007936091
                                            ],
                                            [
                                                0,
                                                38.03078569382294
                                            ],
                                            [
                                                0.439453125,
                                                39.487084981687495
                                            ],
                                            [
                                                0.76904296875,
                                                40.3130432088809
                                            ],
                                            [
                                                3.8891601562499996,
                                                42.09822241118974
                                            ],
                                            [
                                                3.49365234375,
                                                42.4234565179383
                                            ],
                                            [
                                                -1.9555664062500002,
                                                43.46886761482925
                                            ],
                                            [
                                                -9.25048828125,
                                                44.040218713142146
                                            ],
                                            [
                                                -10.107421874999998,
                                                43.02071359427862
                                            ],
                                            [
                                                -9.0087890625,
                                                41.86956082699455
                                            ]
                                        ]
                                    ]
                                }
                            },

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