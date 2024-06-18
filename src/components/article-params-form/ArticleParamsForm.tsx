import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, useCallback, RefObject, useEffect } from 'react';
import clsx from 'clsx';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (props: ArticleStateType) => void;
};

export const CloseClickHook = ({
	isOpen,
	onClose,
	overlayRef,
}: {
	isOpen: boolean;
	onClose: () => void;
	overlayRef: RefObject<HTMLDivElement>;
}) => {
	const prevIsOpenRef = useRef(isOpen);

	const handleClick = useCallback(
		(event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !overlayRef.current?.contains(target)) {
				onClose();
			}
		},
		[onClose, overlayRef]
	);

	useEffect(() => {
		if (!isOpen && prevIsOpenRef.current === isOpen) return;

		prevIsOpenRef.current = isOpen;

		if (isOpen) {
			window.addEventListener('mousedown', handleClick);
		} else {
			window.removeEventListener('mousedown', handleClick);
		}

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, handleClick]);
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(articleState);
	const handleOpenForm = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	const handleFormSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			setArticleState(formState);
			setIsOpen(false);
		},
		[formState, setArticleState]
	);

	const handleFormReset = useCallback(() => {
		setIsOpen(false);
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	}, [setArticleState]);

	const handleChange = useCallback(
		(key: keyof ArticleStateType, value: any) => {
			setFormState((prev) => ({ ...prev, [key]: value }));
		},
		[]
	);

	const rootRef = useRef<HTMLDivElement>(null);

	CloseClickHook({
		isOpen,
		overlayRef: rootRef,
		onClose: () => setIsOpen(false),
	});

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={handleOpenForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text as='h2' size={31} weight={800} align='center' uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(value) => handleChange('fontFamilyOption', value)}
						title='Выберите шрифт'
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						name='font-size'
						onChange={(value) => handleChange('fontSizeOption', value)}
						title='Выберите размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={(value) => handleChange('fontColor', value)}
						title='Выберите цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(value) => handleChange('backgroundColor', value)}
						title='Выберите цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(value) => handleChange('contentWidth', value)}
						title='Выберите ширину контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
