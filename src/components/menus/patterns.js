import React from 'react'
import { list as patterns } from '@freesewing/pattern-info'
import { FormattedMessage } from 'react-intl'
import { Link } from 'gatsby'
import Button from '@material-ui/core/Button'

const PatternMenu = ({ app }) => {
  const style = {
    wrapper: {
      padding: '0 1rem',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: '600px'
    },
    col: {
      padding: '0 0.5rem'
    },
    patterns: {
      margin: 0,
      padding: 0,
      listStyleType: 'none'
    },
    pattern: {
      padding: '0 0.5rem 0 0',
      display: 'inline-block'
    },
    link: {
      textDecoration: 'none',
      color: app.theme === 'dark' ? '#74c0fc' : '#228be6'
    },
    button: {
      margin: '0.5rem 0.5rem 0.5rem 0'
    },
    topButtons: {
      margin: '2rem 0.5rem 0.5rem 0.5rem'
    }
  }

  return (
    <div style={style.wrapper} className={`style-wrapper ${app.theme}`}>
      <div style={style.col}>
        {!app.mobile && (
          <>
            <Button variant="contained" color="primary" style={style.topButtons} href="/designs/">
              <FormattedMessage id="app.browseCollection" />
            </Button>
            {app.account.username && (
              <Button variant="outlined" color="primary" style={style.topButtons} href="/patterns/">
                <FormattedMessage id="app.browseYourPatterns" />
              </Button>
            )}
            <Button color="primary" style={style.topButtons} href="/create/">
              <FormattedMessage
                id="app.newThing"
                values={{ thing: app.translate('app.pattern') }}
              />
            </Button>
          </>
        )}
        <h6>
          <FormattedMessage id="app.designs" />
        </h6>
        <ul style={style.patterns}>
          {patterns.map((pattern, index, array) => (
            <li key={pattern} style={style.pattern}>
              <Link to={`/designs/${pattern}/`} title={app.translate(`patterns.${pattern}.title`)}>
                {app.translate(`patterns.${pattern}.title`)}
              </Link>
              {index === array.length - 1 ? null : ', '}
            </li>
          ))}
        </ul>
      </div>
      <div style={style.col}>
        {app.account.username && Object.keys(app.patterns).length > 0 && (
          <>
            <h6>
              <FormattedMessage id="app.yourPatterns" />
            </h6>
            <ul style={style.patterns}>
              {Object.keys(app.patterns).map((handle) => (
                <li key={handle} style={style.pattern}>
                  <Link to={`/patterns/${handle}/`}>{app.patterns[handle].name}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default PatternMenu
