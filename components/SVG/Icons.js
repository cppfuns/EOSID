import React from 'react';
import { Svg } from 'react-native-svg';

const { G, Path, Defs, ClipPath, Circle } = Svg;

export const BalanceIcon = ({ scale = 1, color = '#fff', ...props }) => (
  <Svg width={21 * scale} height={21 * scale} {...props} viewBox="0 0 30 30">
    <G>
      <Circle
        transform="translate(.866 .866)"
        cx={14.134}
        cy={14.134}
        r={14.134}
        fill="none"
      />
      <Path
        fill={color}
        d="M15 30a15 15 0 1 1 15-15 15.008 15.008 0 0 1-15 15zm0-28.333A13.333 13.333 0 1 0 28.333 15 13.373 13.373 0 0 0 15 1.667z"
      />
    </G>
    <G fill={color}>
      <Path d="M14.886 25.266a1.1 1.1 0 0 1-.462-.173l-.058-.058-1.443-.808L7.9 21.282a.717.717 0 0 1-.346-.866c.289-1.212.577-2.483.866-3.7l1.443-6.178c.058-.115.058-.231.173-.346 1.213-1.732 4.388-6.236 4.388-6.236a.654.654 0 0 1 1.155 0l4.33 6.063a2.815 2.815 0 0 1 .173.4l2.136 9.354c.058.289.115.52.173.808a.5.5 0 0 1-.289.635c-2.194 1.328-4.388 2.656-6.524 3.984a1.1 1.1 0 0 1-.52.173H15c-.056-.107-.056-.107-.114-.107zm-.751-1.443c-.289-.924-.577-1.79-.866-2.714H9.576zm1.79-.058l4.388-2.656h-3.58c-.172.519-.577 1.905-.807 2.656zm-.924-.4l.693-2.252h-1.443zm0-3.233h1.039c.577-1.963 1.212-3.868 1.79-5.774-.577-.982-1.1-1.905-1.617-2.829l-1.155-1.963-.691 1.148-2.191 3.7c.635 1.905 1.213 3.811 1.79 5.716zm2.021 0h4.154l-2.71-4.682zm-4.042 0l-1.443-4.561-2.714 4.561zm-3.753-2.54c.52-.924 1.1-1.848 1.674-2.829a.96.96 0 0 0 .115-.866c-.173-.52-.346-1.1-.52-1.617zm11.49-.115l-1.213-5.37a29.783 29.783 0 0 0-.635 2.136l-.231.173.173-.115c.694 1.034 1.272 2.073 1.907 3.17zm-9.815-6.929a19.528 19.528 0 0 1 .635 1.963l.231.693c.924-1.559 1.79-3.06 2.714-4.619a.179.179 0 0 0 .058-.115V5.404a239.88 239.88 0 0 1-3.638 5.139zm4.561-4.965v2.829c0 .115 0 .173.058.231.52.924 1.1 1.848 1.617 2.771l1.038 1.727.115-.346c.231-.808.462-1.559.751-2.367v-.058c-1.039-1.443-2.079-2.945-3.176-4.388l-.346-.52z" />
      <Path d="M14.886 25.035a.441.441 0 0 1-.289-.115l-.058-.058-1.444-.866-5.023-2.945a.476.476 0 0 1-.289-.577c.289-1.212.577-2.483.866-3.7l1.446-6.174c0-.115.058-.173.115-.289 1.212-1.731 4.385-6.235 4.385-6.235a.5.5 0 0 1 .4-.231.418.418 0 0 1 .346.231l4.33 6.063a.441.441 0 0 1 .115.289l2.136 9.354a4.253 4.253 0 0 0 .231.808.321.321 0 0 1-.173.4c-2.185 1.331-4.385 2.655-6.517 3.987a.862.862 0 0 1-.4.173h-.115c-.004-.115-.004-.115-.062-.115zm-.346-.751l-.115-.462c-.289-.982-.635-1.905-.924-2.829-.058-.115-.058-.115-.173-.115H8.766zm2.079-3.407c-.058 0-.058 0-.115.058-.173.635-1.039 3.349-1.039 3.349l5.6-3.407h-4.447zm-1.617 3.291l.982-3.291h-2.022zm6.582-3.811l-3.176-5.485-1.674 5.485zm-6.582 0h1.1c.058 0 .115 0 .115-.115.577-1.963 1.213-3.868 1.79-5.832v-.231c-.52-.924-1.1-1.848-1.617-2.771l-1.328-2.31-.924 1.5c-.693 1.213-1.443 2.425-2.136 3.7v.173c.635 1.905 1.213 3.868 1.848 5.774 0 .115.058.115.115.115zm-1.732 0l-1.732-5.37-3.176 5.37zm-4.619-1.386l.577-.982c.635-1.039 1.213-2.136 1.848-3.176a1.084 1.084 0 0 0 .115-1.1 19.527 19.527 0 0 1-.635-1.963 1.359 1.359 0 0 1-.115-.462zm10.8-7.564c-.289.924-.577 1.848-.866 2.714-.058.115 0 .173.058.231.751 1.213 1.443 2.483 2.194 3.7l.462.751-1.732-7.679zm-8.718-.982a.108.108 0 0 0 0 .173c.231.635.4 1.328.635 1.963l.346 1.155c.982-1.674 1.963-3.349 3-5.081a.347.347 0 0 0 .058-.231V4.596c-.001.115-3.004 4.388-4.043 5.831zm4.5-4.85v2.829a.821.821 0 0 0 .115.346c.577.982 1.155 1.905 1.674 2.887l1.212 2.021.289-.866c.231-.808.462-1.559.751-2.367.058-.115 0-.173-.058-.289-1.039-1.443-2.079-2.945-3.176-4.388l-.808-1.1z" />
      <Path d="M22.104 20.532a6.713 6.713 0 0 1-.231-1.039c-.693-3.06-1.386-6.063-2.079-9.123a.3.3 0 0 0-.115-.231l-4.33-6.063a.327.327 0 0 0-.577 0c-1.443 2.079-2.945 4.157-4.388 6.236-.058.058-.058.173-.115.231-.4 1.674-.751 3.291-1.155 4.965s-.751 3.291-1.155 4.965c-.058.231 0 .346.231.462l6.409 3.811c.115.058.231.231.4.115a.479.479 0 0 0 .462-.115c2.194-1.328 4.388-2.656 6.524-3.984.119-.059.119-.115.119-.23zm-.577-1.1c-.115-.115-.173-.289-.289-.4-.924-1.559-1.79-3.06-2.714-4.619a.732.732 0 0 1-.058-.346c.346-1.1.693-2.194 1.039-3.349.751 2.943 1.386 5.83 2.021 8.717zM15.173 4.423l.173.173 3.984 5.543a.342.342 0 0 1 .058.4l-1.039 3.291c0 .058-.058.058-.058.173a17.129 17.129 0 0 1-.808-1.386c-.751-1.27-1.443-2.483-2.194-3.753a1.07 1.07 0 0 1-.115-.4V4.538c-.057-.058-.057-.115-.001-.115zM15 8.923c.289.52.635 1.039.924 1.559.693 1.213 1.443 2.425 2.136 3.638a.625.625 0 0 1 .058.346c-.577 1.963-1.213 3.868-1.79 5.832-.058.115-.058.173-.231.173h-2.192c-.115 0-.173-.058-.231-.173-.635-1.905-1.213-3.868-1.848-5.774 0-.115-.058-.173 0-.231 1.1-1.79 2.136-3.58 3.176-5.37zm-4.388 1.443c1.386-2.021 2.829-3.984 4.215-6h.058v4.1c0 .115-.058.173-.115.289-1.039 1.732-2.021 3.522-3.06 5.254l-.058.058a2.068 2.068 0 0 0-.231-.635c-.289-.924-.577-1.848-.866-2.714a.625.625 0 0 1 .059-.348zm-.173.577c.289.982.577 1.905.924 2.829a1.289 1.289 0 0 1-.115 1.213c-.924 1.5-1.79 3-2.656 4.5 0 .058-.058.115-.115.173.578-2.937 1.271-5.824 1.963-8.711zm1.156 3.76c.635 1.963 1.212 3.868 1.848 5.774H8.189c1.154-1.909 2.309-3.814 3.406-5.774zm-3.176 6.12a.212.212 0 0 1 .173-.058h4.735a.267.267 0 0 1 .289.173c.346 1.212.751 2.367 1.155 3.638A820.37 820.37 0 0 0 8.42 20.82zm6.582 3.7c-.4-1.27-.808-2.54-1.212-3.753h2.367c-.346 1.263-.75 2.475-1.154 3.746zm.289.058c.115-.462.289-.866.4-1.328.231-.751.462-1.559.693-2.31.058-.115.058-.173.173-.173h4.85c-1.958 1.263-4.033 2.533-6.116 3.803zm6.467-4.1c-.058.058-.115 0-.173 0h-5.023c.577-1.963 1.213-3.868 1.79-5.832a.057.057 0 0 1 .058.058c1.1 1.848 2.136 3.7 3.233 5.543.057.108.173.166.115.224z" />
    </G>
  </Svg>
);

export const ResourceIcon = ({ scale = 1, color = '#fff', ...props }) => (
  <Svg
    width={21 * scale}
    height={21 * scale}
    {...props}
    viewBox="0 0 15.999 17"
  >
    <G>
      <G>
        <G>
          <Path
            fill={color}
            d="M3.531 17.002H.003V6.455a1.1 1.1 0 0 1 1.094-1.094h1.375a1.1 1.1 0 0 1 1.094 1.094v10.547z"
          />
        </G>
        <G>
          <Path
            fill={color}
            d="M9.749 17.003H6.221V1.079A1.09 1.09 0 0 1 7.315.003h1.376a1.09 1.09 0 0 1 1.094 1.076v15.924z"
          />
        </G>
        <G>
          <Path
            fill={color}
            d="M15.968 17.003H12.44v-7.02a1.1 1.1 0 0 1 1.094-1.094h1.376a1.1 1.1 0 0 1 1.094 1.094v7.02z"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export const ActivityIcon = ({ scale = 1, color = '#fff', ...props }) => (
  <Svg width={21 * scale} height={21 * scale} {...props} viewBox="0 0 21 21">
    <Path
      fill="#fff"
      transform="translate(-.867 -.867)"
      d="M19.589 1.5H3.144A1.649 1.649 0 0 0 1.5 3.144v16.445a1.649 1.649 0 0 0 1.644 1.644h16.445a1.649 1.649 0 0 0 1.644-1.644V3.144A1.649 1.649 0 0 0 19.589 1.5z"
    />
    <Path
      fill={color}
      d="M18.735 21H2.265A2.285 2.285 0 0 1 0 18.735V2.265A2.285 2.285 0 0 1 2.265 0h16.47A2.285 2.285 0 0 1 21 2.265v16.47A2.285 2.285 0 0 1 18.735 21zM2.265 1.235a1.019 1.019 0 0 0-1.03 1.03v16.47a1.019 1.019 0 0 0 1.029 1.029h16.471a1.019 1.019 0 0 0 1.029-1.029V2.265a1.019 1.019 0 0 0-1.029-1.029z"
    />
    <G fill={color} transform="translate(3.665 6.427)">
      <Path
        transform="translate(-9 -15.85)"
        d="M9 19.08a.877.877 0 0 1 .211-.507l2.66-2.533a.663.663 0 0 1 .929 0l2.533 2.533a.687.687 0 0 1-.971.971l-2.069-2.069-2.2 2.069a.677.677 0 0 1-.971-.042A.63.63 0 0 1 9 19.08z"
      />
      <Path
        transform="translate(-12.64 -15.937)"
        d="M15.3 23.347v-6.671a.676.676 0 0 1 1.351 0v6.671a.676.676 0 0 1-1.351 0z"
      />
    </G>
    <G fill={color} transform="translate(10.585 6.487)">
      <Path
        transform="translate(-26 -21.749)"
        d="M26 26.6a.678.678 0 0 1 .211-.464.715.715 0 0 1 .971 0l2.069 2.069 2.2-2.069a.687.687 0 1 1 .929 1.013l-2.66 2.533a.663.663 0 0 1-.929 0l-2.533-2.533A.908.908 0 0 1 26 26.6z"
      />
      <Path
        transform="translate(-29.467 -16)"
        d="M32 23.347v-6.671a.676.676 0 1 1 1.351 0v6.671a.676.676 0 1 1-1.351 0z"
      />
    </G>
  </Svg>
);

export const SettingsIcon = ({ scale = 1, color = '#fff', ...props }) => (
  <Svg width={21 * scale} height={21 * scale} {...props} viewBox="0 0 21 21">
    <G transform="translate(-298 -597)">
      <Path
        fill="#fff"
        transform="translate(295 593.9)"
        d="M23.864 12.347l-2.091-.364a.683.683 0 0 1-.545-.5 7.568 7.568 0 0 0-.864-2.1.619.619 0 0 1 .045-.729l1.227-1.731a.139.139 0 0 0 0-.182l-1.454-1.454c-.091.046-.091.046-.136.046s-.045 0-.091.046l-1.682 1.23a.7.7 0 0 1-.727.046 7.268 7.268 0 0 0-2.136-.866.629.629 0 0 1-.5-.547l-.364-2.05c0-.046-.045-.091-.136-.091h-2.092c-.045 0-.136.046-.136.091l-.364 2.1a.684.684 0 0 1-.5.547 8.129 8.129 0 0 0-2.045.861.616.616 0 0 1-.727-.046L6.864 5.423a.159.159 0 0 0-.091-.046c-.045 0-.045 0-.091.046L5.273 6.881a.139.139 0 0 0 0 .182L6.5 8.794a.7.7 0 0 1 .045.729 8.48 8.48 0 0 0-.864 2.1.629.629 0 0 1-.545.5l-2.045.364c-.045 0-.091.046-.091.137v2.1c0 .046.045.137.091.137l2.091.364a.683.683 0 0 1 .545.5 8.165 8.165 0 0 0 .864 2.05.619.619 0 0 1-.045.729l-1.228 1.678a.139.139 0 0 0 0 .182l1.455 1.458a.141.141 0 0 0 .091.046c.045 0 .045 0 .091-.046l1.727-1.23a.6.6 0 0 1 .364-.137.841.841 0 0 1 .318.091 8.014 8.014 0 0 0 2.045.82.629.629 0 0 1 .5.547l.364 2.1c0 .046.045.091.136.091H14.5c.045 0 .136-.046.136-.091l.364-2.1a.684.684 0 0 1 .5-.547 7.533 7.533 0 0 0 2.091-.866.616.616 0 0 1 .727.046l1.727 1.23a.159.159 0 0 0 .091.046c.045 0 .045 0 .091-.046l1.455-1.458a.139.139 0 0 0 0-.182l-1.227-1.731a.7.7 0 0 1-.045-.729 8.48 8.48 0 0 0 .864-2.1.629.629 0 0 1 .545-.5l2.091-.364c.045 0 .091-.046.091-.137v-2.1zm-10.409 6.287a5.1 5.1 0 1 1 5.091-5.1 5.088 5.088 0 0 1-5.091 5.1z"
      />
      <G fill={color} transform="translate(1)">
        <Path
          transform="translate(297 597)"
          d="M19.91 8.311l-1.454-.243a8.813 8.813 0 0 0-.606-1.419l.888-1.216a1.293 1.293 0 0 0-.121-1.662l-1.332-1.339a1.277 1.277 0 0 0-.929-.365 1.326 1.326 0 0 0-.767.243l-1.212.89a9.621 9.621 0 0 0-1.494-.608l-.243-1.457A1.236 1.236 0 0 0 11.388 0H9.531a1.3 1.3 0 0 0-1.293 1.095L8 2.595a8.743 8.743 0 0 0-1.417.605l-1.212-.889a1.239 1.239 0 0 0-.771-.243 1.277 1.277 0 0 0-.929.365L2.383 3.77a1.25 1.25 0 0 0-.121 1.662l.888 1.257a5.765 5.765 0 0 0-.565 1.459l-1.454.243A1.237 1.237 0 0 0 0 9.649v1.865a1.3 1.3 0 0 0 1.09 1.3l1.494.243a8.813 8.813 0 0 0 .606 1.419l-.848 1.216a1.293 1.293 0 0 0 .121 1.662l1.292 1.3a1.277 1.277 0 0 0 .929.365 1.326 1.326 0 0 0 .767-.243l1.249-.898a8.16 8.16 0 0 0 1.373.568l.242 1.459A1.3 1.3 0 0 0 9.612 21h1.858a1.3 1.3 0 0 0 1.292-1.095L13 18.446a8.743 8.743 0 0 0 1.413-.608l1.212.892a1.239 1.239 0 0 0 .767.243 1.277 1.277 0 0 0 .929-.365l1.292-1.3a1.25 1.25 0 0 0 .121-1.662l-.888-1.216a8.813 8.813 0 0 0 .606-1.419l1.454-.243a1.3 1.3 0 0 0 1.09-1.3v-1.86a1.3 1.3 0 0 0-1.086-1.297zm-.081 3.162c0 .041-.04.122-.081.122l-1.858.324a.607.607 0 0 0-.485.446 6.742 6.742 0 0 1-.767 1.865.552.552 0 0 0 .04.649l1.09 1.541a.124.124 0 0 1 0 .162l-1.292 1.3c-.081-.041-.081-.041-.121-.041s-.04 0-.081-.041l-1.534-1.1a.621.621 0 0 0-.646-.041 7.493 7.493 0 0 1-1.858.77.56.56 0 0 0-.444.486l-.323 1.865c0 .041-.04.081-.121.081H9.49c-.04 0-.121-.041-.121-.081l-.323-1.865a.608.608 0 0 0-.444-.486 7.113 7.113 0 0 1-1.817-.73.747.747 0 0 0-.283-.081.458.458 0 0 0-.323.122l-1.535 1.098c-.04 0-.04.041-.081.041a.125.125 0 0 1-.081-.041l-1.292-1.3c-.04-.041-.04-.081 0-.162l1.09-1.5a.627.627 0 0 0 .04-.649 7.274 7.274 0 0 1-.767-1.824.607.607 0 0 0-.485-.446l-1.858-.324c-.04 0-.081-.041-.081-.122V9.649c0-.041.04-.122.081-.122L3.029 9.2a.607.607 0 0 0 .485-.446 6.742 6.742 0 0 1 .767-1.865.552.552 0 0 0-.04-.649l-1.01-1.5a.124.124 0 0 1 0-.162l1.292-1.3a.141.141 0 0 0 .077-.035c.04 0 .04 0 .081.041l1.498 1.094a.621.621 0 0 0 .646.041 7.216 7.216 0 0 1 1.817-.77.608.608 0 0 0 .444-.486L9.41 1.3c0-.041.04-.081.121-.081h1.858c.04 0 .121.041.121.081l.323 1.824a.608.608 0 0 0 .444.486 8.484 8.484 0 0 1 1.9.77.546.546 0 0 0 .646-.041l1.454-1.095h.081a.125.125 0 0 1 .081.041l1.292 1.3c.04.041.04.081 0 .162l-1.09 1.541a.627.627 0 0 0-.04.649 7.554 7.554 0 0 1 .764 1.863.559.559 0 0 0 .485.446l1.858.324c.04 0 .081.041.081.122v1.784z"
        />
        <Path
          transform="translate(288.16 588.2)"
          d="m19.341 14.8a4.541 4.541 0 1 0 4.541 4.541 4.533 4.533 0 0 0-4.541-4.541zm0 7.905a3.365 3.365 0 1 1 3.365-3.365 3.357 3.357 0 0 1-3.365 3.365z"
        />
      </G>
    </G>
  </Svg>
);

export const ArrowIcon = ({ scale = 1, color = '#fff', down, ...props }) => (
  <Svg width={21 * scale} height={21 * scale} {...props} viewBox="0 0 24 24">
    <G transform={down ? 'translate(-112 -36)' : 'rotate(180 68 30)'}>
      <Path
        stroke={color}
        transform="translate(-8969.5 2407.6)"
        d="m9086.6-2363.3 6.522 6 6.478-6"
      />
    </G>
  </Svg>
);

export const AccountIcon = ({ scale = 1, color = '#fff', ...props }) => (
  <Svg width={21 * scale} height={21 * scale} {...props} viewBox="0 0 26 26">
    <Defs>
      <ClipPath id="prefix__b">
        <Circle className="prefix__cls-1" cx={11.841} cy={11.841} r={11.841} />
      </ClipPath>
      <ClipPath id="prefix__a">
        <Circle cx={11.841} cy={11.841} r={11.841} />
      </ClipPath>
    </Defs>
    <Circle
      fill="none"
      transform="translate(.521 .521)"
      cx={12.353}
      cy={12.353}
      r={12.353}
    />
    <G>
      <G clipPath="url(#prefix__b)" transform="translate(1.159 1.159)">
        <Path
          fill="none"
          d="M12.079 4.973A4.737 4.737 0 1 1 7.342 9.71a4.737 4.737 0 0 1 4.737-4.737z"
        />
        <Path
          fill={color}
          d="M12.078 15.157a5.447 5.447 0 1 1 5.447-5.447 5.478 5.478 0 0 1-5.447 5.447zm0-9.473a4.026 4.026 0 1 0 4.026 4.026 4.023 4.023 0 0 0-4.026-4.026z"
        />
      </G>
      <G clipPath="url(#prefix__a)" transform="translate(1.159 1.159)">
        <Path
          fill="none"
          d="M19.135 20.368c.947 4.5-3.173 5.921-7.1 5.921s-7.579-1.421-7.1-5.921a6.811 6.811 0 0 1 7.096-5.921 7.093 7.093 0 0 1 7.104 5.921z"
        />
        <Path
          fill={color}
          d="M12.031 26.998c-2.084 0-4.879-.379-6.584-2.226a5.517 5.517 0 0 1-1.232-4.5c.379-3.789 3.695-6.536 7.815-6.536a7.826 7.826 0 0 1 7.815 6.489 4.912 4.912 0 0 1-.853 4.358c-1.703 2.084-5.066 2.415-6.961 2.415zm0-11.841a6.148 6.148 0 0 0-6.394 5.3 4.1 4.1 0 0 0 .9 3.363c1.326 1.468 3.695 1.753 5.494 1.753 2.747 0 4.879-.71 5.826-1.895a3.486 3.486 0 0 0 .568-3.126 6.37 6.37 0 0 0-6.394-5.395z"
        />
      </G>
    </G>
    <Path
      fill={color}
      d="M13 26a13 13 0 1 1 13-13 13.022 13.022 0 0 1-13 13zm0-24.528A11.528 11.528 0 1 0 24.528 13 11.515 11.515 0 0 0 13 1.472z"
    />
  </Svg>
);

export const MemoIcon = ({ scale = 1, color = '#fff', ...props }) => (
  <Svg
    width={21 * scale}
    height={21 * scale}
    {...props}
    viewBox="0 0 25 25.037"
  >
    <G>
      <Path
        d="M7.516 22.377l-6 1.936a.723.723 0 0 1-.878-.823l1.854-6.1 16.49-16.352a1.3 1.3 0 0 1 1.805 0l3.171 3.145a1.278 1.278 0 0 1 0 1.79z"
        fill="#242424"
      />
      <Path
        fill={color}
        d="M1.387 25.011a1.36 1.36 0 0 1-.97-.385 1.419 1.419 0 0 1-.388-1.3v-.046l1.892-6.253L18.455.577a2 2 0 0 1 2.812 0L24.418 3.7a1.963 1.963 0 0 1 0 2.79L7.933 22.943l-6.206 2.02c-.097 0-.194.048-.34.048zm1.794-7.263L1.436 23.52l5.673-1.876L23.4 5.483a.582.582 0 0 0 0-.77l-3.151-3.126a.594.594 0 0 0-.776 0z"
      />
    </G>
    <G fill={color}>
      <Path d="M2.824 17.25l.923-.923 4.616 4.616-.923.924z" />
      <Path d="M.512 22.905l1.54-1.94 2.123 2.204-2.54 1.193z" />
      <Path d="M15.298 5.262l.923-.924L20.683 8.8l-.924.924z" />
      <Path d="M16.836 3.746l.924-.923 4.462 4.462-.924.923z" />
    </G>
  </Svg>
);
