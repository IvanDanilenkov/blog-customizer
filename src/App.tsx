import { FC, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/';
import { ArticleParamsForm } from './components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

type ArticleState = typeof defaultArticleState;

export const App: FC = () => {
	// открыт ли сайдбар
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	// состояние статьи
	const [articleState, setArticleState] =
		useState<ArticleState>(defaultArticleState);

	// Состояние сайдбара (открыть/закрыть)
	const handleToggleSidebar = () => {
		setSidebarOpen((prev) => !prev);
	};

	// применить настройки
	const handleApply = (newValues: ArticleStateType) => {
		setArticleState(newValues);
		setSidebarOpen(false);
	};

	// сброс к дефолтным значениям
	const handleReset = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
					'--image-width':
						articleState.contentWidth.value === '1394px' ? '1600px' : '100%',
				} as CSSProperties
			}>
			{isSidebarOpen && (
				<div className={styles.overlay} onClick={handleToggleSidebar}></div>
			)}
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={handleToggleSidebar}
				onApply={handleApply}
				onReset={handleReset}
				initialValues={articleState}
			/>
			<Article />
		</main>
	);
};
