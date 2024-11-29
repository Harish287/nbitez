import React from 'react'

export const SocialsNetworks = ({ addClass = '' }: { addClass?: string }) => {

    return <div className="d-flex gap-3 header-socials">
        <a href="https://www.facebook.com/share/FFt3qYaaaQnaD64t/"><i className={'bi bi-facebook fd-hover-color-primary ' + addClass}></i></a>
        {/* <a href="#"><i className={'bi bi-twitter fd-hover-color-primary ' + addClass}></i></a> */}
        <a href="https://www.instagram.com/natur_bitez?igsh=MTkzeTZrMDRxZ3l2aw=="><i className={'bi bi-instagram fd-hover-color-primary ' + addClass}></i></a>
        {/* <a href="#"><i className={'bi bi-vimeo fd-hover-color-primary ' + addClass}></i></a> */}
    </div>
}