import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, useCallback } from 'react';
import { useCloseClick } from './hooks/hooks';
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

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState(articleState);
	const handleOpenForm = useCallback(() => {
		setIsMenuOpen(!isMenuOpen);
	}, [isMenuOpen]);

	const handleFormSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			setArticleState(formState);
			setIsMenuOpen(false);
		},
		[formState, setArticleState]
	);

	const handleFormReset = useCallback(() => {
		setIsMenuOpen(false);
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

	useCloseClick({
		isMenuOpen,
		overlayRef: rootRef,
		onClose: () => setIsMenuOpen(false),
	});

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isMenuOpen} onClick={handleOpenForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text as='h2' size={31} weight={800} align='left' uppercase>
						Задайте параметры
					</Text>
					<Separator />
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(value) => handleChange('fontFamilyOption', value)}
						title='Выберите шрифт'
					/>
					<Separator />
					<RadioGroup
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						name='font-size'
						onChange={(value) => handleChange('fontSizeOption', value)}
						title='Выберите размер шрифта'
					/>
					<Separator />
					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={(value) => handleChange('fontColor', value)}
						title='Выберите цвет шрифта'
					/>
					<Separator />
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(value) => handleChange('backgroundColor', value)}
						title='Выберите цвет фона'
					/>
					<Separator />
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
