<template lang="pug">
    Loading(v-if='connecting')
    section.call(v-else)
        video.call__preview.js-callPreview(autoplay)
        .call__fields
            input.call__field(readonly :value='myPeerId')
            input.call__field(:placeholder='$t(\'placeholders.connect\')' v-model='remotePeerId')
            button.call__connect(@click='connect' type='button') {{ $t('buttons.connect') }}
        .call__container
            video.call__stream.js-callStream(autoplay)
            .call__messages
                .call__messages___list
                    .call__messages___row(v-for='m in messages' :class='{ \'is-mine\': m.id === myPeerId }')
                        .call__messages___message(:class='{ \'is-mine\': m.id === myPeerId }')
                            | {{ m.message }}
                form.call__messages___form(@submit.prevent='semdMessage')
                    input.call__messages___field(:placeholder='$t(\'placeholders.message\')' v-model='message')
                    button.call__messages___send(type='submit') {{ $t('buttons.send') }}
</template>

<script>
import Peer from 'peerjs'

import { error, info } from '@utils/log'

import Loading from '@components/Loading'

export default {
    components: {
        Loading
    },
    created() {
        this.myPeer = new Peer({ key: 'lwjd5qra8257b9' })
        this.myPeer.on('open', id => {
            info('Connected at PeerJS server with success')
            this.myPeerId = id
            this.connecting = false
        })
        this.myPeer.on('call', remoteCall => {
            const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
            getUserMedia({ audio: true, video: true }, stream => {
                remoteCall.answer(stream)
                remoteCall.on('stream', remoteStream => {
                    const myVideo = document.querySelector('.js-callStream')
                    if (myVideo) {
                        myVideo.srcObject = remoteStream
                        info('Connected with local Video and Audio')
                    }
                })
            }, error => error(error))
        })
        this.myPeer.on('connection', con => {
            this.connection = con
            con.on('open', () => {
                con.on('data', newMessage => this.messages.push(newMessage))
            })
        })
    },
    data: () => ({
        connection: null,
        connecting: true,
        message: '',
        messages: [],
        myPeer: null,
        myPeerId: '',
        remotePeerId: ''
    }),
    methods: {
        connect() {
            if (this.remotePeerId.trim().length) {
                this.connection = this.myPeer.connect(this.remotePeerId)
                this.connection.on('open', () => {
                    this.connection.on('data', newMessage => this.messages.push(newMessage))
                })
                const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
                if (getUserMedia) {
                    info('Got a UserMedia')
                    getUserMedia({ audio: true, video: true }, stream => {
                        const myCall = this.myPeer.call(this.remotePeerId, stream)
                        myCall.on('stream', remoteStream => {
                            const myVideo = document.querySelector('.js-callStream')
                            if (myVideo) {
                                myVideo.srcObject = remoteStream
                                info('Connected with local Video and Audio')
                            }
                        })
                    }, error => console.error(error))
                }
            }
        },
        semdMessage() {
            const newMessage = {
                id: this.myPeerId,
                message: this.message
            }
            if (this.connection) {
                this.connection.send(newMessage)
            }
            this.messages.push(newMessage)
            this.message = ''
        }
    },
    name: 'New',
    updated() {
        if (this.myPeerId.trim().length && !this.connecting) {
            const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
            getUserMedia({ video: true }, stream => {
                const myPreviewVideo = document.querySelector('.js-callPreview')
                if (myPreviewVideo) {
                    myPreviewVideo.srcObject = stream
                    info('Connected preview stream')
                }
            }, error => error(error))
        }
    }
}
</script>

<style lang="sass" scoped>
    .call
        &__preview
            $gap: 1rem
            bottom: $gap
            left: $gap
            position: fixed
            width: 250px
        &__container
            display: flex
        &__fields
            display: flex
        &__field
            border: none
            box-shadow: 0 0 5px rgba(0, 0, 0, .25)
            color: #393939
            font-size: 2rem
            padding: 1rem 2rem
            width: 100%
            &[readonly]
                background: #fafafa
                color: #808080
                pointer-events: none
            &:focus
                outline: none
        &__connect
            background: #00cc99
            border: none
            color: #fdfdfd
            font-size: 1.5rem
            padding: 1rem
            transition: background .2s ease-in
            &:focus
                outline: none
            &:hover
                background: #009973
                cursor: pointer
        &__stream
            height: calc(100vh - 68px)
            flex-grow: 1
            object-fit: fill
        &__messages
            border-left: 1px solid #dcdcdc
            display: flex
            flex-direction: column
            justify-content: space-between
            width: 25vw
            &___list
                flex-grow: 1
                overflow-y: scroll
                padding: 2rem
            &___row
                margin-bottom: 1rem
                text-align: left
                &.is-mine
                    text-align: right
            &___message
                display: inline-block
                background: #dcdcdc
                border-radius: 10px
                color: #595959
                padding: 1rem
                &.is-mine
                    background: #bfbfbf
            &___form
                display: flex
            &___field
                border: 1px solid #dcdcdc
                border-left: none
                border-right: none
                color: #393939
                padding: 1rem
                width: 100%
                &:focus
                    outline: none
            &___send
                background: #00cc99
                border: none
                color: #fdfdfd
                padding: 1rem
                &:focus
                    outline: none
</style>

