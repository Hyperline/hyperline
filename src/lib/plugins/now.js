import React from 'react'
import Component from 'hyper/component'
import execa from 'execa'

class Now extends Component {
    static displayName() {
        return "now"
    }

    constructor(props) {
        super(props)

        this.interval = null
        this.fetchTeam = this.fetchTeam.bind(this)

        this.state = {
            team: null,
            fetching: false,
        }
    }

    async osUser() {
        const {stdout: user} = await execa('whoami')
        return user
    }

    async readNowToken() {

        const user = await this.osUser()

        const path = `/Users/${user}/.now/auth.json`
        const {stdout} = await execa('cat', [path])

        const config = JSON.parse(stdout)

        return config.token
    }

    async readCurrentTeam() {
        const user = await this.osUser()

        const path = `/Users/${user}/.now/config.json`
        const {stdout} = await execa('cat', [path])

        const config = JSON.parse(stdout)

        return config.currentTeam
    }

    async fetchTeams(token) {
        const res = await fetch('https://api.zeit.co/teams', { method: "GET", headers: { Authorization: `bearer ${token}`}})
        const json = await res.json()
        return json.teams
    }

    async fetchUser(token) {
        const res = await fetch('https://api.zeit.co/www/user', { method: "GET", headers: { Authorization: `bearer ${token}`}})
        const json = await res.json()
       
        return json.user.username
    }

    async fetchTeam() {
        if (this.state.fetching) {
            return
        }

        try {
          
            await new Promise(resolve => this.setState(() => ({ fetching: true }), resolve))
          
            const token = await this.readNowToken()
            const teams = await this.fetchTeams(token)
            const teamId = await this.readCurrentTeam()
    
            const team = teams.find(team => team.id === teamId) || null;
    
            let update = {fetching: false}
            if (team) {
                update.team = team.name
            } else {
                update.team = await this.fetchUser(token)
            }
            
            this.setState(() => update)
        } catch(err) {
            console.error('Hyperline::now plugin', err)
            this.setState(() => ({ fetching: false }))
        }
    }
    
    componentDidMount() {
        this.fetchTeam()
        this.interval = setInterval(this.fetchTeam.bind(this), 60000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return this.state.team ? `▲ ${this.state.team}` : '▲'
    }
}

export default Now