import { useRef, useCallback, RefObject, useEffect } from 'react';
export const useCloseClick = ({
	isMenuOpen,
	onClose,
	overlayRef,
}: {
	isMenuOpen: boolean;
	onClose: () => void;
	overlayRef: RefObject<HTMLDivElement>;
}) => {
	const prevIsOpenRef = useRef(isMenuOpen);

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
		if (!isMenuOpen && prevIsOpenRef.current === isMenuOpen) return;

		prevIsOpenRef.current = isMenuOpen;

		if (isMenuOpen) {
			window.addEventListener('mousedown', handleClick);
		}

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isMenuOpen, handleClick]);
};
