import React, { useState } from 'react'
import { FAB, Portal } from 'react-native-paper'
import PropTypes from 'prop-types'

const Fab = ({ setShowScanner, setOpenBrandModal }) => {
  const [state, setState] = useState({ open: false })

  const onStateChange = ({ open }) => setState({ open })

  const { open } = state

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'calendar-today' : 'database-search'}
        actions={[
          // { icon: 'camera', onPress: () => console.log('Pressed add') },
          // {
          //   icon: 'star',
          //   label: 'Star',
          //   onPress: () => console.log('Pressed star'),
          // },
          {
            icon: 'star',
            label: 'Marca / Modelo',
            onPress: () => setOpenBrandModal(true),
          },
          {
            icon: 'camera',
            label: 'Código de Barras',
            onPress: () => setShowScanner(true),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  )
}

export default Fab

Fab.propTypes = {
  setShowScanner: PropTypes.func,
  setOpenBrandModal: PropTypes.func,
}
