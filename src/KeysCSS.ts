import { CSSProperties } from "react";

export default (
    position: string | false
): CSSProperties => {
    return {
        position: 'absolute',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 'max-content',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        pointerEvents: 'none',
        // If position isn't recognised, we'll default to top-right.
        top:position && !position.includes('bottom') ? '0' : 'unset',
        bottom:position && position.includes('bottom') ? '0' : 'unset',
        right:position && !position.includes('left') ? '0' : 'unset',
        left: position && position.includes('left') ? '0' : 'unset',
        justifyContent: position && position.includes('left') ? 'flex-start' : 'flex-end',
    }
};