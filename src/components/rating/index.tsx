import * as React from 'react';
import './index.css';
import { starFull, starHalf } from '../../img/index';

export namespace Rating {
    export interface Props {
        max: number;
        score: number;
    }

    export interface State {
        // empty
    }
}

class Rating extends React.Component<Rating.Props, Rating.State> {
    constructor() {
        super();
    }

    static defaultProps = {
        max: 5,
        score: 0
    };

    render() {
        var stars = [];
        for (let i = 0; i < this.props.max; i++) {
            stars.push(<img className='full-star' src={starFull} key={i} />);

            if (Math.floor(this.props.score) === i + 1) {
                if ((this.props.score % 1) >= 0.5) {
                    stars.push(<img className='half-star' src={starHalf} key={i + 'h'} />);
                }
                break;
            }
        }

        return (
            <div className='rating'>
                {stars}
            </div>
        );
    }
}

export default Rating;