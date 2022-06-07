import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { faCloudUpload, faCoins, faEarthAsia, faEllipsisVertical, faGear, faKeyboard, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from '@tippyjs/react';
import classNames from "classnames/bind";
import 'tippy.js/dist/tippy.css';
import images from '~/assets/images';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import Search from '../Search'
import styles from './Header.module.scss';


const cx = classNames.bind(styles);

const currentUser = true;

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Languages',
            data: [
                {
                    code: 'en',
                    title: 'Tiếng Anh',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                }
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    }
]

const userMenu = [

    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/@hoaa',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coins',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
]

function Header() {

    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="tiktok" />
            </div>

            <Search />

            <div className={cx('action')}>
                {currentUser ? (
                    <>
                        <Tippy delay={[0, 200]} content='Upload video'>
                            <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faCloudUpload}></FontAwesomeIcon>
                            </button>
                        </Tippy>

                    </>

                ) : (

                    <>
                        <Button text>Upload</Button>
                        <Button primary className={cx('custom-login')} >Log in</Button>

                    </>

                )}

                <Menu items={currentUser ? userMenu : MENU_ITEMS}>
                    {currentUser ?
                        (
                            <Image
                                className={cx('user-avatar')}
                                src="https://static.remove.bg/remove-bg-web/6ad52d54336ad62d58e7bd1317d40fb98e377ad5/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214s.jpg"
                                alt="Nguyễn Văn A"
                            // fallback='https://static.fullstack.edu.vn/static/media/f8-icon.7ad2b161d5e80c87e516.png'
                            />
                        ) : (
                            <>
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            </>
                        )}

                </Menu>

            </div>
        </div >
    </header >;
}

export default Header;