import './Cards.css';

export const Cards = (props) => {

    return(
        <div className={`flashcards ${props.cards.vegan == 0 ? 'yellow' : props.cards.vegan == 1 ? 'blue' : 'green' }`} onClick={() => props.setShowAnswer(!props.showAnswer)}>
            {!props.showAnswer && 
            (
            <div className='question'>{props.cards.question}</div>
            )}
            {props.showAnswer && (
                    <div className='answer'>{props.cards.answers[0]}
                    <img src={props.cards.img} /></div>
            )}
        </div>
    )
}