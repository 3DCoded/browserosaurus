import clsx from 'clsx'
import React from 'react'
import { useDispatch } from 'react-redux'
import Url from 'url'

import { CARROT_URL } from '../../../config/CONSTANTS'
import { useSelector } from '../../store'
import {
  clickedBWebsiteButton,
  clickedCloseMenuButton,
  clickedCopyButton,
  clickedQuitButton,
  clickedReloadButton,
  clickedSetAsDefaultBrowserButton,
  clickedSettingsButton,
  clickedUpdateRestartButton,
  clickedUrlBackspaceButton,
} from '../../store/actions'
import Button from '../atoms/button'
import { Carrot } from '../atoms/carrot'
import {
  BackspaceIcon,
  ClipboardCopyIcon,
  CogIcon,
  GiftIcon,
  GlobeIcon,
  HomeIcon,
  LogoutIcon,
  RefreshIcon,
  XIcon,
} from '../atoms/icons'

interface Props {
  className?: string
}

const UrlBar: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch()
  const url = useSelector((state) => state.ui.url)
  const isEditMode = useSelector((state) => state.ui.isEditMode)
  const isDefaultProtocolClient = useSelector(
    (state) => state.ui.isDefaultProtocolClient,
  )
  const version = useSelector((state) => state.ui.version)
  const updateStatus = useSelector((state) => state.ui.updateStatus)
  const isDarkMode = useSelector((state) => state.theme.isDarkMode)

  const isEmpty = url.length === 0
  const parsedUrl = Url.parse(url)

  return (
    <div
      className={clsx(
        className,
        'flex-shrink-0',
        'w-full px-4',
        'flex items-center space-x-4',
        'bg-black bg-opacity-10',
      )}
      style={{ height: '74px' }}
    >
      <div
        className={clsx(
          'flex-grow h-full',
          'flex items-center justify-between',
          'overflow-hidden',
          'pr-1',
          'tracking-wider',
        )}
      >
        {isEditMode && (
          <Button
            aria-label="Goto Browserosaurus website"
            onClick={() => dispatch(clickedBWebsiteButton())}
            title="Goto Browserosaurus website"
          >
            {isEditMode && updateStatus === 'available' ? (
              'Downloading update...'
            ) : (
              <HomeIcon className="h-5 w-5" />
            )}
          </Button>
        )}

        {isEditMode && (
          <span className="absolute bottom-0 left-1 text-xxs opacity-30">
            {version}
          </span>
        )}

        {!isEditMode && (
          <div
            className={clsx(
              'tracking-wider text-opacity-50',
              isDarkMode ? 'text-white' : 'text-black',
            )}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              overflowWrap: 'break-word',
              wordBreak: 'break-all',
              textOverflow: 'ellipsis',
            }}
          >
            {url === CARROT_URL && (
              <div>
                <Carrot /> Donation URL:
              </div>
            )}
            <span>{parsedUrl.protocol}</span>
            <span>{parsedUrl.slashes && '//'}</span>
            <span
              className={clsx(
                'text-opacity-100',
                isDarkMode ? 'text-white' : 'text-black',
              )}
            >
              {parsedUrl.host || (
                <span className="opacity-30">Browserosaurus</span>
              )}
            </span>
            <span>
              {parsedUrl.pathname}
              {parsedUrl.search}
              {parsedUrl.hash}
            </span>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 space-x-2 flex items-center">
        {!isDefaultProtocolClient && isEditMode && (
          <Button
            aria-label="Set as default browser"
            onClick={() => dispatch(clickedSetAsDefaultBrowserButton())}
            title="Set as default browser"
          >
            <GlobeIcon className="h-5 w-5" />
          </Button>
        )}

        {isEditMode && updateStatus === 'downloaded' && (
          <Button
            aria-label="Restart and update"
            className="space-x-2"
            onClick={() => dispatch(clickedUpdateRestartButton())}
          >
            <GiftIcon className="h--5 w-5" />
            <span>Update</span>
          </Button>
        )}

        {isEditMode && updateStatus === 'no-update' && (
          <Button
            aria-label="Reload"
            onClick={() => dispatch(clickedReloadButton())}
            title="Reload Browserosaurus"
          >
            <RefreshIcon className="h-5 w-5" />
          </Button>
        )}

        {isEditMode && (
          <Button
            aria-label="Quit"
            onClick={() => dispatch(clickedQuitButton())}
            title="Quit"
          >
            <LogoutIcon className="h-5 w-5" />
          </Button>
        )}

        {!isEditMode && (
          <Button
            disabled={isEmpty}
            onClick={() => dispatch(clickedUrlBackspaceButton())}
            title="Delete section of URL (Backspace)"
          >
            <BackspaceIcon className="h-5 w-5" />
          </Button>
        )}

        {!isEditMode && (
          <Button
            disabled={isEmpty}
            onClick={() => dispatch(clickedCopyButton(url))}
            title="Copy (⌘+C)"
          >
            <ClipboardCopyIcon className="h-5 w-5" />
          </Button>
        )}

        {isEditMode ? (
          <Button
            aria-label="Close menu"
            onClick={() => dispatch(clickedCloseMenuButton())}
            title="Close menu (escape)"
          >
            <XIcon className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            aria-label="Settings menu"
            onClick={() => dispatch(clickedSettingsButton())}
            title="Settings"
          >
            <CogIcon
              className={clsx(
                'h-5 w-5',
                updateStatus === 'downloaded' && 'text-green-600',
                updateStatus === 'available' && 'animate-spin',
              )}
            />
          </Button>
        )}
      </div>
    </div>
  )
}

export default UrlBar
