import { FC, FormEvent, useState, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	ArticleStateType,
	fontSizeOptions,
	contentWidthArr,
	fontColors,
	backgroundColors,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';

export type ArticleParamsFormProps = {
	isOpen: boolean; // открыт ли сайдбар
	onToggle: () => void; // клик по стрелке
	onApply: (value: ArticleStateType) => void; // кнопка "Применить"
	onReset: () => void; // кнопка "Сбросить"
	initialValues: ArticleStateType;
};

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
	isOpen,
	onToggle,
	onApply,
	onReset,
	initialValues,
}) => {
	// локальное состояние формы
	const [formState, setFormState] = useState<ArticleStateType>(initialValues);

	// актуальные значения при открытии сайдбара
	useEffect(() => {
		if (isOpen) {
			setFormState(initialValues);
		}
	}, [isOpen, initialValues]);

	// Применяем настройки для формы
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	// Reset формы
	const handleReset = () => {
		setFormState(initialValues);
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				className={clsx(styles.container, {
					[styles.containerOpen]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase={true} align='left'>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							setFormState({ ...formState, fontFamilyOption: option })
						}
					/>
					<RadioGroup
						title='Размер текста'
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) =>
							setFormState({ ...formState, fontSizeOption: option })
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) =>
							setFormState({ ...formState, fontColor: option })
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) =>
							setFormState({ ...formState, backgroundColor: option })
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) =>
							setFormState({ ...formState, contentWidth: option })
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
