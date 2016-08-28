const styles = {
}

export const drawIcon = (React, icon, fill) => {
  const icons = {
    hostname: (<svg style={styles} width="16px" height="16px" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <g fill={fill} transform="translate(1.000000, 1.000000)">
          <path d="M2,0 L12,0 L12,8 L2,8 L2,0 Z M4,2 L10,2 L10,6 L4,6 L4,2 Z M5.5,11 L8.5,11 L8.5,14 L5.5,14 L5.5,11 Z M11,11 L14,11 L14,14 L11,14 L11,11 Z M0,11 L3,11 L3,14 L0,14 L0,11 Z M6.5,10 L7.5,10 L7.5,11 L6.5,11 L6.5,10 Z M12,10 L13,10 L13,11 L12,11 L12,10 Z M1,10 L2,10 L2,11 L1,11 L1,10 Z M1,9 L13,9 L13,10 L1,10 L1,9 Z M6.5,8 L7.5,8 L7.5,9 L6.5,9 L6.5,8 Z"></path>
        </g>
      </g>
    </svg>),
    memory: (<svg style={styles} width="16px" height="16px" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <g fill={fill}>
          <g id="memory" transform="translate(1.000000, 1.000000)">
            <path d="M3,0 L11,0 L11,14 L3,14 L3,0 Z M4,1 L10,1 L10,13 L4,13 L4,1 Z"></path>
            <rect x="5" y="2" width="4" height="10"></rect>
            <rect x="12" y="1" width="2" height="1"></rect>
            <rect x="12" y="3" width="2" height="1"></rect>
            <rect x="12" y="5" width="2" height="1"></rect>
            <rect x="12" y="9" width="2" height="1"></rect>
            <rect x="12" y="7" width="2" height="1"></rect>
            <rect x="12" y="11" width="2" height="1"></rect>
            <rect x="0" y="1" width="2" height="1"></rect>
            <rect x="0" y="3" width="2" height="1"></rect>
            <rect x="0" y="5" width="2" height="1"></rect>
            <rect x="0" y="9" width="2" height="1"></rect>
            <rect x="0" y="7" width="2" height="1"></rect>
            <rect x="0" y="11" width="2" height="1"></rect>
          </g>
        </g>
      </g>
    </svg>),
    uptime: (<svg style={styles} width="16px" height="16px" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <g fill={fill} transform="translate(1.000000, 1.000000)">
          <g>
            <path d="M0,0 L14,0 L14,14 L0,14 L0,0 Z M1,1 L13,1 L13,13 L1,13 L1,1 Z"></path>
            <path d="M6,2 L7,2 L7,7 L6,7 L6,2 Z M6,7 L10,7 L10,8 L6,8 L6,7 Z"></path>
          </g>
        </g>
      </g>
    </svg>),
    cpu: (<svg style={styles} width="16px" height="16px" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <g fill={fill} transform="translate(1.000000, 1.000000)">
          <g>
            <path d="M3,3 L11,3 L11,11 L3,11 L3,3 Z M4,4 L10,4 L10,10 L4,10 L4,4 Z"></path>
            <rect x="5" y="5" width="4" height="4"></rect>
            <rect x="4" y="0" width="1" height="2"></rect>
            <rect x="6" y="0" width="1" height="2"></rect>
            <rect x="8" y="0" width="1" height="2"></rect>
            <rect x="5" y="12" width="1" height="2"></rect>
            <rect x="7" y="12" width="1" height="2"></rect>
            <rect x="9" y="12" width="1" height="2"></rect>
            <rect x="12" y="3" width="2" height="1"></rect>
            <rect x="12" y="5" width="2" height="1"></rect>
            <rect x="12" y="7" width="2" height="1"></rect>
            <rect x="12" y="9" width="2" height="1"></rect>
            <rect x="0" y="4" width="2" height="1"></rect>
            <rect x="0" y="4" width="2" height="1"></rect>
            <rect x="0" y="6" width="2" height="1"></rect>
            <rect x="0" y="8" width="2" height="1"></rect>
            <rect x="0" y="10" width="2" height="1"></rect>
          </g>
        </g>
      </g>
    </svg>),
    speed: (<svg style={styles} width="16px" height="16px" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <g fill={fill} transform="translate(1.000000, 1.000000)">
          <g>
            <path d="M0,10 L7,10 L7,11 L0,11 L0,10 Z M1,11 L6,11 L6,12 L1,12 L1,11 Z M2,12 L5,12 L5,13 L2,13 L2,12 Z M3,13 L4,13 L4,14 L3,14 L3,13 Z M2,3 L5,3 L5,10 L2,10 L2,3 Z"></path>
            <path d="M8,2 L13,2 L13,3 L8,3 L8,2 Z M9,1 L12,1 L12,2 L9,2 L9,1 Z M10,0 L11,0 L11,1 L10,1 L10,0 Z M7,3 L14,3 L14,4 L7,4 L7,3 Z M9,4 L12,4 L12,11 L9,11 L9,4 Z"></path>
          </g>
        </g>
      </g>
    </svg>),
    battery: (<svg style={styles} width="16px" height="16px" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <g fill={fill} transform="translate(1.000000, 1.000000)">
          <path d="M7,1 L9,1 L9,2 L7,2 L7,1 Z M4,2 L12,2 L12,15 L4,15 L4,2 Z M5,3 L11,3 L11,10 L5,10 L5,3 Z"></path>
        </g>
      </g>
    </svg>)
  }

  return icons[icon]
}
