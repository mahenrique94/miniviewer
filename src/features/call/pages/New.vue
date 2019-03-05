<template lang="pug">
    Loading(v-if='connecting')
    section.call(v-else)
        video.call__preview.js-callPreview(autoplay)
        .call__fields
            input.call__field(readonly :value='myPeerId')
            input.call__field(placeholder='Connect to...' v-model='remotePeerId')
            button.call__connect(@click='connect' type='button') Connect
        .call__container
            video.call__stream.js-callStream(autoplay)
            .call__messages
                .call__messages___list
                input.call__messages___field
                button.call__messages___send(type='button') Send
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
    },
    data: () => ({
        connecting: true,
        messages: [],
        myPeer: null,
        myPeerId: '',
        remotePeerId: ''
    }),
    methods: {
        connect() {
            if (this.remotePeerId.trim().length) {
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
        }
    },
    name: 'New',
    updated() {
        if (this.myPeerId.trim().length && !this.connecting) {
            const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
            getUserMedia({ video: true }, stream => {
                const myPreviewVideo = document.querySelector('.js-callPreview')
                console.log(myPreviewVideo)
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
            width: 25vw
</style>

