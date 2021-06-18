import clsx from 'clsx'
import React from 'react'
import { useDispatch } from 'react-redux'

import {
  clickedAlreadyDonated,
  clickedDonate,
  clickedMaybeLater,
} from '../../../../shared-state/actions'
import { useIsSupportMessageHidden } from '../../../../shared-state/hooks'

const SupportMessage = (): JSX.Element => {
  const dispatch = useDispatch()
  const isSupportMessageHidden = useIsSupportMessageHidden()

  return (
    <div
      className={clsx(
        'absolute inset-0',
        'grid grid-cols-2 gap-4 bg-blueGray-800 text-blueGray-400 overflow-y-auto px-8',
        isSupportMessageHidden && 'hidden',
      )}
    >
      <div className="flex flex-col justify-center space-y-2">
        <p>
          If you enjoy using Browserosaurus or any other of my open source
          tools, I would love a token of your appreciation.
        </p>
        <p>
          Thank you{' '}
          <span aria-label="kiss emoji" role="img">
            😘
          </span>
        </p>
        <p>— Will</p>
      </div>

      <div className="flex flex-col justify-center items-stretch space-y-4">
        <button
          className="bg-blueGray-900 text-blueGray-100 p-4 rounded text-xl focus:outline-none active:opacity-75"
          onClick={() => dispatch(clickedDonate())}
          type="button"
        >
          Buy Me a Coffee
        </button>
        <button
          className="bg-blueGray-900 text-blueGray-300 p-2 rounded focus:outline-none active:opacity-75"
          onClick={() => dispatch(clickedMaybeLater())}
          type="button"
        >
          Maybe Later
        </button>
        <button
          className="bg-blueGray-900 text-blueGray-500 p-2 rounded focus:outline-none active:opacity-75"
          onClick={() => dispatch(clickedAlreadyDonated())}
          type="button"
        >
          Already Donated
        </button>
      </div>
    </div>
  )
}

export default SupportMessage
