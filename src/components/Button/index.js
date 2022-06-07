import classNames from "classnames/bind";
import styles from './Button.module.scss';
import { Link } from 'react-router-dom'

function Button({ to, href, children, primary = false, outline = false, text = false, disabled = false, rounded = false, small = false, large = false, className = false, lefticon, righicon, onClick, ...passProps }) {
    let Comp = 'button';
    const props = {
        lefticon,
        righicon,
        onClick,
        ...passProps
    }

    if (disabled) {
        Object.keys(props).forEach(keys => {
            if (keys.startsWith('on') && typeof props[keys] === 'function') {
                delete props[keys]
            }
        })
    }

    if (to) {
        Comp = Link;
        props.to = to;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    }

    const cx = classNames.bind(styles);
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        text,
        disabled,
        rounded,
        small,
        large
    });
    return (
        <Comp className={classes} {...props}>
            {lefticon && <span className={cx('icon')}>{lefticon}</span>}
            <span className={cx('title')}>{children}</span>
            {righicon && <span className={cx('icon')}>{righicon}</span>}

        </Comp>
    );
}

export default Button;