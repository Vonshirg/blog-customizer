import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export const ArrowButton = ({
	onClick,
	isOpen,
}: {
	onClick: OnClick;
	isOpen: boolean;
}) => {
	// управление стилями открытого и закрытого состояния
	const containerClasses = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	const arrowClasses = clsx(styles.arrow, {
		[styles.arrow_open]: isOpen,
	});

	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={containerClasses}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={arrowClasses} />
		</div>
	);
};
