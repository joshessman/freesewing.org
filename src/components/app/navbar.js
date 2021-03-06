import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import Logo from '@freesewing/components/Logo'
import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'

import Popover from '@material-ui/core/Popover'
import AccountMenu from '../menus/account'
import NavbarIcons from './navbar-icons'

import AccountIcon from '@material-ui/icons/Face'
import Icon from '@freesewing/components/Icon'

export default function ButtonAppBar(props) {
  // Don't show on mobile
  if (props.app.mobile) return null

  // Use of effect to avoid SSR issues
  // Effects
  useEffect(() => {
    if (props.app.account.username) setLoggedIn(true)
  }, [props.app.account])

  const [userAnchor, setUserAnchor] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  const handleUserOpen = (event) => setUserAnchor(event.currentTarget)

  const handlePopoverClose = () => {
    setUserAnchor(null)
  }

  const userOpen = Boolean(userAnchor)

  const colors = {
    light: '#212529',
    dark: '#f8f9fa'
  }

  const style = {
    wrapper: {
      flexGrow: 1,
      width: '100%',
      margin: 0,
      padding: 0,
      background: props.app.theme === 'dark' ? colors.light : colors.dark,
      zIndex: 15
    },
    logo: {
      textDecoration: 'none',
      height: '42px',
      width: '42px',
      padding: '11px',
      display: 'inline-block',
      color: colors[props.app.theme]
    },
    button: {
      height: '64px',
      padding: '0 18px'
    },
    iconButton: {
      color: colors[props.app.theme]
    },
    icon: {
      maxWidth: '24px',
      maxHeight: '24px'
    },
    spacer: {
      flexGrow: 1
    },
    darkModeIcon: {
      transform: 'rotate(26deg)',
      maxWidth: '24px',
      maxHeight: '24px'
    }
  }

  const popoverProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    },
    disableRestoreFocus: true,
    elevation: 1
  }

  const buttonProps = {
    color: 'primary',
    size: 'large',
    style: style.button
  }
  buttonProps['aria-haspopup'] = 'true'

  const iconStyle = {
    marginRight: '0.5rem',
    color: props.app.theme === 'dark' ? '#b197fc' : '#845ef7'
  }

  return (
    <div style={style.wrapper}>
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar disableGutters={true}>
          <Link to="/" style={style.logo}>
            <Logo embed />
          </Link>

          {loggedIn ? (
            <>
              <Button
                aria-owns={userOpen ? 'user-popover' : undefined}
                onClick={handleUserOpen}
                {...buttonProps}
              >
                <AccountIcon style={{ ...iconStyle }} />
                <FormattedMessage id="app.account" />
              </Button>
              <Popover
                id="user-popover"
                open={userOpen}
                anchorEl={userAnchor}
                onClose={handlePopoverClose}
                {...popoverProps}
              >
                <AccountMenu app={props.app} />
              </Popover>
            </>
          ) : (
            <Button href="/login/" color="inherit" size="large" style={style.button}>
              <FormattedMessage id="app.logIn" />
            </Button>
          )}

          <span style={style.spacer} />

          <Button {...buttonProps} href="https://chat.freesewing.org/">
            <Icon style={{ ...iconStyle }} icon="discord" />
            <FormattedMessage id="app.chatOnDiscord" />
          </Button>

          <NavbarIcons
            translate={props.app.translate}
            toggleDarkMode={props.app.toggleDarkMode}
            theme={props.app.theme}
            language={props.app.language}
          />
        </Toolbar>
      </AppBar>
    </div>
  )
}
