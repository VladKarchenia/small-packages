import { BaseIllustration, IIllustrationProps } from "../Illustration";

export const IllustrationLock = ({ scribble = false, ...props }: IIllustrationProps) => (
  <BaseIllustration {...props}>
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120 "
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {scribble && (
        <path
          d="M58.713 69.954c2.52-.603 5.034-1.224 7.557-1.803 3.613-.832 7.212-1.742 10.875-2.336 2.65-.43 5.3-.93 7.995-.881.353 0 .72-.053 1.021.176.553.421 1.09.804 1.825.936.465.085.72.583.739 1.123.053 1.445-.027 2.857-.92 4.089-.055.076-.131.176-.126.25.097 1.204-.777 2.036-1.205 3.028-.304.705-1.012 1.132-1.687 1.52-1.698.97-3.508 1.706-5.278 2.52-.065.069-.16.108-.177.212a.504.504 0 0 1 .177-.016c1.737-.296 3.468-.617 5.209-.881 2.279-.353 4.55-.751 6.855-.882.915-.054 1.806-.079 2.449.75a.83.83 0 0 0 .514.234c1.218.26 1.537.678 1.45 1.918a12.86 12.86 0 0 1-.453 2.633c-.034.22-.13.426-.278.594a.906.906 0 0 0-.327.941.424.424 0 0 1-.028.28c-.85 1.548-1.435 3.219-3.267 4.088-2.081.987-4.145 2.018-6.23 2.996a498.342 498.342 0 0 0-12.61 6.17.187.187 0 0 0-.102.137c0 .014.033.025.083.025 1.537-.048 3.048-.34 4.576-.489 2.42-.236 4.84-.578 7.274-.44 2.518.142 4.93.754 7.135 2.035.856.5.966.898.648 1.828a3.611 3.611 0 0 1-1.472 1.939c-3.201 2.129-6.659 3.497-10.534 3.804-2.84.224-5.666.58-8.5.881-4.009.423-7.997 1.044-12.015 1.387-.512.04-1.026.04-1.539 0-.706-.047-1.288-.391-1.913-.759-1.73-1.023-2.368-2.792-3.299-4.368-.325-.55-.473-1.172-.622-1.798a2.338 2.338 0 0 1 .177-1.569 5.707 5.707 0 0 1 1.61-2.115 33.33 33.33 0 0 1 3.433-2.455.159.159 0 0 0 .102-.141c0-.025-.037-.039-.081-.039-2.092.46-4.13 1.12-6.197 1.673-3.304.881-6.581 1.866-9.954 2.467-.443.064-.89.092-1.338.085a.87.87 0 0 1-.634-.176c-1.092-1.031-2.606-1.645-3.094-3.28-.176-.594-.616-1.113-.956-1.654a6.394 6.394 0 0 1-.93-2.592c-.138-1.037.31-1.867 1.06-2.535.883-.79 1.943-1.356 2.962-1.939 3.024-1.734 6.131-3.312 9.218-4.935-.047-.519-.367-.187-.581-.187-.898.026-1.795.065-2.693.076-.763.01-1.344-.369-1.998-.758-1.645-.98-2.22-2.67-3.111-4.157a5.252 5.252 0 0 1-.478-1.145 3.076 3.076 0 0 1 .401-2.736c.066-.114.125-.232.177-.352-.295-.154-.507.053-.724.137-2.98 1.17-5.912 2.468-8.94 3.504a21.07 21.07 0 0 1-3.24.882c-.764.134-1.331-.159-1.78-.693a5.04 5.04 0 0 1-.829-1.507c-.219-.605-.067-.96.53-1.257 5.347-2.693 10.573-5.62 15.987-8.182 7.067-3.349 14.294-6.298 21.753-8.66 1.675-.528 3.357-1.029 5.124-1.233.638-.078 1.283-.226 1.751.42.12.165.353.128.53.188.707.234.816.414.86 1.18.048.822-.203 1.598-.47 2.333a25.531 25.531 0 0 1-.938 2.249 3.88 3.88 0 0 1-1.569 1.752c-1.434.844-2.881 1.667-4.32 2.506-1.602.936-3.201 1.88-4.802 2.82-.039.067-.127.134-.042.212a.189.189 0 0 0 .224-.028Z"
          fill="#FDBB30"
        />
      )}

      <path
        d="M25.906 56.388c.291 3.406.512 6.794.715 10.174.203 3.38.37 6.741.512 10.112.141 3.37.282 6.714.37 10.067.089 3.353.203 6.715.265 10.059l-.468-1.094c.494.43 1.013.832 1.553 1.2.574.383 1.157.765 1.765 1.112a39.264 39.264 0 0 0 3.742 1.948 55.775 55.775 0 0 0 8.048 2.846 71.124 71.124 0 0 0 34.487.507 56.815 56.815 0 0 0 8.277-2.757c1.333-.587 2.648-1.21 3.9-1.921a28.388 28.388 0 0 0 3.575-2.303l-.353.711c-.053-6.91-.168-13.83-.115-20.74l.212-20.73.573 1.378a21.032 21.032 0 0 0-1.623-1.227 24.415 24.415 0 0 0-1.818-1.139 40.486 40.486 0 0 0-3.848-2 47.031 47.031 0 0 0-8.286-2.776c-1.412-.382-2.86-.587-4.306-.89-1.448-.301-2.904-.408-4.413-.444l-2.206-.142H64.25c-1.465 0-2.991 0-4.492.089-6.027.231-12.054.587-18.01 1.378-2.98.38-5.93.974-8.825 1.78-1.42.414-2.794.98-4.095 1.689a6.675 6.675 0 0 0-2.92 3.113Zm-.353 0a6.805 6.805 0 0 1 2.868-3.744 20.522 20.522 0 0 1 4.121-2.224 51.213 51.213 0 0 1 8.869-2.623 138.566 138.566 0 0 1 18.196-2.517c1.527-.116 3.036-.24 4.607-.276l2.338-.08 2.348.071c1.562 0 3.115.249 4.685.373 1.545.258 3.107.445 4.642.828a44.209 44.209 0 0 1 8.984 2.979 39.24 39.24 0 0 1 4.227 2.232c.688.418 1.35.89 2.012 1.343.688.49 1.348 1.018 1.976 1.583A1.78 1.78 0 0 1 96 55.712l-.776 20.713c-.283 6.91-.724 13.812-1.104 20.713v.08a.813.813 0 0 1-.353.623 28.755 28.755 0 0 1-3.98 2.258c-1.34.659-2.726 1.219-4.12 1.779a73.42 73.42 0 0 1-8.516 2.597 104.278 104.278 0 0 1-17.57 2.392c-1.483.089-2.965.08-4.413.125-1.447.044-2.973-.071-4.465-.133a66.04 66.04 0 0 1-8.913-1.174 44.896 44.896 0 0 1-8.657-2.74 38.535 38.535 0 0 1-4.085-2.098 28.414 28.414 0 0 1-1.95-1.281 19.687 19.687 0 0 1-1.907-1.548 1.477 1.477 0 0 1-.467-1.076V86.768c0-3.388.061-6.768.123-10.147.062-3.38.159-6.76.274-10.121.114-3.362.23-6.795.432-10.112Z"
        fill="#000"
      />
      <path
        d="M34.422 50.963a32.186 32.186 0 0 1-1.236-6.519 40.175 40.175 0 0 1-.08-6.679 34.409 34.409 0 0 1 1.095-6.661 23.47 23.47 0 0 1 2.647-6.315 23.505 23.505 0 0 1 10.043-8.893c.97-.534 2.02-.89 3.035-1.317.521-.177 1.05-.337 1.571-.506l.794-.25.803-.195 1.606-.391c.539-.107 1.086-.196 1.624-.294 1.094-.213 2.189-.32 3.292-.436a35.819 35.819 0 0 1 6.698-.044c.556.08 1.12.16 1.676.258l.883.142.83.213c.555.152 1.12.285 1.667.463l1.624.614a20.813 20.813 0 0 1 5.965 3.753 19.225 19.225 0 0 1 4.254 5.683 24.922 24.922 0 0 1 2.18 6.608c.42 2.233.609 4.504.564 6.777a39.898 39.898 0 0 1-.653 6.66 34.701 34.701 0 0 1-1.712 6.395l-.344-.089a69.3 69.3 0 0 0-.07-12.842 32.478 32.478 0 0 0-3.31-11.757 19.657 19.657 0 0 0-3.441-4.732 18.806 18.806 0 0 0-4.792-3.388 32.16 32.16 0 0 0-11.966-2.757 23.52 23.52 0 0 0-3.168 0c-.521 0-1.05 0-1.58.098l-1.562.258-.785.133-.76.222c-.502.143-1.014.285-1.517.445a17.91 17.91 0 0 0-2.877 1.316 19.949 19.949 0 0 0-2.586 1.779L43.697 19.8c-.38.356-.688.783-1.032 1.165a25.05 25.05 0 0 0-3.221 5.247 45.383 45.383 0 0 0-3.6 11.873 87.465 87.465 0 0 0-1.05 12.816l-.371.062Z"
        fill="#000"
      />
      <path
        d="M46.493 47.494a16.197 16.197 0 0 1-1.209-3.735 20.875 20.875 0 0 1-.158-7.924 12.67 12.67 0 0 1 1.288-3.887 14.053 14.053 0 0 1 5.815-5.611 19.189 19.189 0 0 1 3.6-1.54c.31-.11.625-.199.945-.266l.953-.258c.644-.115 1.288-.284 1.942-.373a16.642 16.642 0 0 1 2.003-.187h1.023l1.033.098a11.41 11.41 0 0 1 4.05 1.263 12.74 12.74 0 0 1 5.754 6.225c1.06 2.514 1.6 5.22 1.588 7.95.041 2.632-.362 5.252-1.191 7.747l-.353-.044c-.335-2.553-.688-5.016-1.227-7.39a38.089 38.089 0 0 0-.926-3.46 24.952 24.952 0 0 0-1.297-3.184 15.904 15.904 0 0 0-1.704-2.784 10.751 10.751 0 0 0-2.312-2.206 11.642 11.642 0 0 0-2.965-1.378 16.186 16.186 0 0 0-3.415-.73c-1.2-.14-2.413-.099-3.6.125a8.513 8.513 0 0 0-3.31 1.343 7.715 7.715 0 0 0-2.373 2.615 15.97 15.97 0 0 0-1.333 3.193 40.289 40.289 0 0 0-1.544 6.865c-.335 2.393-.512 4.865-.733 7.435l-.344.098ZM55.141 88.77c0-.89.053-1.78.098-2.811.044-1.032.097-2.037.176-3.104.168-2.152.432-4.447.82-6.67l.76 1.663a9.6 9.6 0 0 1-2.162-1.707 8.618 8.618 0 0 1-1.553-2.233 7.972 7.972 0 0 1-.495-5.336 6.31 6.31 0 0 1 1.156-2.463 5.61 5.61 0 0 1 2.092-1.61 9.993 9.993 0 0 1 2.347-.703 18.904 18.904 0 0 1 2.365-.293A7.517 7.517 0 0 1 65.6 64.73a6.035 6.035 0 0 1 1.764 2.099c.4.806.671 1.67.804 2.561a8.516 8.516 0 0 1-.839 5.399 8.124 8.124 0 0 1-1.827 2.24 9.147 9.147 0 0 1-1.173.846c-.212.115-.424.231-.644.338a5.723 5.723 0 0 1-.768.311l1.244-2.312a108.017 108.017 0 0 1 3.45 11.98v.213a1.479 1.479 0 0 1-.563 1.54 1.453 1.453 0 0 1-.522.238c-.143.022-.289.022-.432 0a78.382 78.382 0 0 1-5.86-.622c-1.862-.267-3.556-.543-5.092-.792Zm.274-.223c2.083-.249 3.971-.543 5.718-.818 1.748-.276 3.38-.49 4.986-.623l-1.473 2.02a110.648 110.648 0 0 1-3.963-11.83l-.14-.569a1.406 1.406 0 0 1 .157-1.03c.182-.31.477-.537.822-.633a1.69 1.69 0 0 1 .414-.044c.103-.024.203-.056.3-.098.13-.049.257-.105.38-.169.256-.125.5-.27.732-.436.459-.32.857-.72 1.174-1.183a6.54 6.54 0 0 0 .953-3.495 4.91 4.91 0 0 0-1.024-3.557 4.915 4.915 0 0 0-3.689-1.432 8.155 8.155 0 0 0-4.147.978c-.546.34-.987.826-1.276 1.404a3.518 3.518 0 0 0-.356 1.87 6.967 6.967 0 0 0 1.023 3.557 9.693 9.693 0 0 0 1.809 2.152c.22.19.45.368.689.533l.185.134a1.466 1.466 0 0 1 .565 1.53c-.433 1.823-.989 3.557-1.642 5.496l-2.197 6.243Z"
        fill="#000"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M94.554 54.703c0 .001.001.001-.768.822l.77-.82c.233.218.362.526.354.846l-.98 41.445a1.125 1.125 0 0 1-.43.858l-.694-.885.694.886-.005.003-.01.008-.031.024-.112.083c-.097.071-.237.172-.422.298-.37.253-.915.607-1.639 1.03-1.447.847-3.609 1.967-6.499 3.092-5.783 2.25-14.474 4.513-26.194 4.639-11.738.126-20.086-2.203-25.527-4.595-2.719-1.196-4.706-2.404-6.024-3.324a21.5 21.5 0 0 1-1.483-1.125 12.423 12.423 0 0 1-.48-.424l-.03-.027-.009-.01-.003-.002-.001-.002.787-.803-.788.802a1.125 1.125 0 0 1-.337-.788L24.2 56.277a1.126 1.126 0 0 1 .047-.334c.542-1.825 2.043-3.267 4.064-4.42 2.036-1.163 4.751-2.122 8.003-2.916 6.51-1.59 15.406-2.578 25.895-3.1 10.66-.53 18.716 1.736 24.126 4.154 2.702 1.208 4.74 2.453 6.11 3.403.686.476 1.205.877 1.557 1.164a14.724 14.724 0 0 1 .51.435l.03.028.009.008.003.003.001.002ZM26.937 96.212l.061.051c.284.237.723.585 1.326 1.006 1.206.841 3.066 1.976 5.642 3.109 5.148 2.263 13.18 4.528 24.597 4.405 11.436-.123 19.86-2.329 25.403-4.486 2.773-1.079 4.828-2.146 6.18-2.937a25.326 25.326 0 0 0 1.504-.945l.044-.03.954-40.355a22.848 22.848 0 0 0-1.485-1.116c-1.269-.88-3.186-2.053-5.748-3.198-5.119-2.289-12.823-4.47-23.095-3.96-10.443.519-19.17 1.498-25.473 3.037-3.155.771-5.643 1.669-7.422 2.684-1.706.975-2.626 1.98-2.974 2.958l.486 39.777Z"
        fill="#000"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m35.302 50.62-1.11.182-1.11.182v-.002l-.002-.007-.004-.024a38.79 38.79 0 0 1-.206-1.642 54.085 54.085 0 0 1-.268-4.336c-.08-3.575.152-8.371 1.417-13.19 1.266-4.82 3.583-9.727 7.725-13.433 4.16-3.723 10.06-6.141 18.304-6.141 8.234 0 13.965 2.354 17.862 6.013 3.879 3.641 5.818 8.46 6.706 13.17.888 4.713.74 9.398.377 12.884a52.79 52.79 0 0 1-.61 4.23 38.046 38.046 0 0 1-.315 1.516l-.02.086-.006.023-.002.007v.002l-1.092-.272a304.346 304.346 0 0 0-1.092-.272l.001-.003.004-.017a10.01 10.01 0 0 0 .083-.36c.057-.257.137-.638.228-1.124.183-.975.41-2.371.584-4.048.349-3.364.482-7.813-.351-12.235s-2.617-8.738-6.035-11.947c-3.4-3.19-8.539-5.403-16.322-5.403-7.773 0-13.114 2.265-16.804 5.568-3.71 3.32-5.854 7.778-7.048 12.327C35 36.9 34.775 41.472 34.852 44.923c.039 1.721.152 3.154.256 4.153a36.388 36.388 0 0 0 .19 1.523l.003.017.001.003Z"
        fill="#000"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M67.781 28.697c-1.903-1.805-4.642-3.003-8.673-2.829-4.04.176-6.704 1.574-8.49 3.489-1.811 1.942-2.81 4.516-3.311 7.171-.5 2.65-.49 5.3-.35 7.303.07.997.172 1.826.256 2.401a23.198 23.198 0 0 0 .136.83l.007.04.002.009-1.103.223c-1.102.223-1.103.222-1.103.222v-.002l-.001-.004-.003-.016-.01-.053a25.4 25.4 0 0 1-.152-.925 35.123 35.123 0 0 1-.273-2.568c-.149-2.115-.166-4.973.383-7.877.547-2.9 1.674-5.926 3.877-8.289 2.23-2.39 5.47-4.003 10.038-4.201 4.578-.2 7.93 1.178 10.319 3.444 2.357 2.236 3.681 5.246 4.42 8.17.741 2.93.916 5.863.91 8.047a37.353 37.353 0 0 1-.1 2.658 26.789 26.789 0 0 1-.088.96l-.006.056-.002.016-.001.005v.001l-1.116-.142-1.116-.142v-.002l.001-.01.005-.041.02-.177c.016-.157.038-.391.06-.691.045-.601.09-1.463.094-2.497.005-2.075-.163-4.805-.842-7.49-.68-2.693-1.852-5.253-3.788-7.089ZM63.662 65.929c-.962-.71-2.316-.952-3.776-.842-1.555.116-2.9.407-3.841 1.064-.854.595-1.516 1.59-1.516 3.515 0 1.883.823 3.306 1.687 4.287.432.49.865.858 1.187 1.103a6.5 6.5 0 0 0 .475.327l.019.011h-.002m.003 0c.421.241.64.725.544 1.2l-2.19 10.813 7.96.02.454 1.462 1.075-.333.002-1.125-1.53-.004-3.244-10.446a1.125 1.125 0 0 1 .714-1.4 5.358 5.358 0 0 0 2.706-2.055 5.44 5.44 0 0 0 .941-3.336c0-2.355-.76-3.592-1.668-4.261m-7.574 10.953-.042-.032a10.419 10.419 0 0 1-1.519-1.41c-1.104-1.254-2.248-3.184-2.248-5.774 0-2.55.935-4.285 2.48-5.361 1.456-1.016 3.31-1.338 4.959-1.462 1.743-.13 3.716.121 5.28 1.275 1.613 1.19 2.577 3.179 2.582 6.05a7.69 7.69 0 0 1-1.333 4.627 7.618 7.618 0 0 1-2.828 2.49l3.396 10.937a1.125 1.125 0 0 1-1.077 1.459l-10.863-.027a1.125 1.125 0 0 1-1.1-1.348l2.313-11.424Z"
        fill="#000"
      />
    </svg>
  </BaseIllustration>
);
