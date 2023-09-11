<script lang="ts">
  import Header from '../Header.svelte';
  import Footer from '../Footer.svelte';
  import Cursor from '../Cursor.svelte';
  import { onMount } from 'svelte';

  const numberOfImages = 35;
  const numberOfImages2 = 13;
  const totalImages = numberOfImages + numberOfImages2;

  let preloadedImg: string[] = [];
  $: preloadImageUrls = [...Array(numberOfImages).keys()].map((key) => `/gallery/gallery${key+1}.jpg`);
  $: preloadImageUrls2 = [...Array(numberOfImages2).keys()].map((key) => `/bg/webp/${key+1}.webp`);
  $: preloadedImg = [...preloadImageUrls, ...preloadImageUrls2];

  let closeBtn : HTMLElement;

  const handleClick = (e: MouseEvent) => {
    const enlarge: HTMLDivElement | null = document.querySelector('.enlarge-section');
    let btns = Array.from(document.querySelectorAll('a, button'));
    let enlargeNav = Array.from(document.querySelectorAll('.close, .left, .right'));
    let hamBtns = Array.from(document.querySelectorAll('.hamburgerLink'));

    const enlargedImg = enlarge!.children[0].children[0] as HTMLImageElement;
    let index = +(enlargedImg.alt.split('-')[1]);
    const target = e.currentTarget as HTMLElement;

    if(target.dataset.action === 'close') {
      enlarge?.classList.add('hidden');
      //assistive technology necessary tabbing only
      btns.forEach((btn) =>{
        btn.setAttribute("tabindex", "0"); 
      });
      hamBtns.forEach((btn) =>{
        btn.setAttribute("tabindex", "-1"); 
      });
    } else if (target.dataset.action === 'left') {
      index = (index - 1) < 0 ? totalImages - 1 : index - 1
      enlargedImg.src = preloadedImg[index];
      enlargedImg.alt = `img-${index}`;
    } else if (target.dataset.action === 'right') {
      index = (index + 1) % totalImages;
      enlargedImg.src = preloadedImg[index];
      enlargedImg.alt = `img-${index}`;
    } else {
      if(enlarge) {
        enlarge.classList.remove('hidden');
        enlargedImg.src = (target.children[0] as HTMLImageElement).src;
        enlargedImg.alt = (target.children[0] as HTMLImageElement).alt;
        //assistive technology necessary tabbing only
        closeBtn.focus();
        btns.forEach((btn) =>{
          btn.setAttribute("tabindex", "-1"); 
        });
        enlargeNav.forEach((btn) => {
          btn.setAttribute("tabindex", "0")
        });
      }
    }
  }

</script>

<svelte:head>
  <title>Asayake Taiko | Gallery</title>
  {#each preloadImageUrls as image}
  <link rel="preload" as="image" href={image} />
  {/each}
  {#each preloadImageUrls2 as image}
  <link rel="preload" as="image" href={image} />
  {/each}
  <meta name="description" content="Asayake Taiko | Gallery" />
</svelte:head>

<Header page="gallery" />
<div class='banner-wrapper'>
  <div class='banner'>
    <h1>Gallery</h1>
  </div>
</div>
<div class='gallery-wrapper mx-auto'>
  <span class='note'>*Click to Enlarge Image</span>
  <div class='gallery'>
    {#each preloadImageUrls as path, i}
    <button class='gallery-image' tabindex="0" on:click={handleClick}>
      <img src="{path}" alt="img-{i}" />
    </button>
    {/each}
    {#each preloadImageUrls2 as path, i}
    <button class='gallery-image' tabindex="0" on:click={handleClick} >
      <img src="{path}" alt="img-{i+34}" />
    </button>
    {/each}
  </div>
</div>
<div class="enlarge-section hidden">
  <div>
    <img src="" alt="enlarged" />
    <button bind:this={closeBtn} tabindex="0" class='close' data-action='close' on:click={handleClick}>
      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="34" height="34" rx="9.5" stroke="#EEEEEE"/>
        <path d="M12.2434 9.1001L9.1001 12.2434L10.7052 13.8485L14.6733 17.8835L10.7052 21.8517L9.1001 23.3899L12.2434 26.6001L13.8485 24.995L17.8835 20.96L21.8517 24.995L23.3899 26.6001L26.6001 23.3899L24.995 21.8517L20.96 17.8835L24.995 13.8485L26.6001 12.2434L23.3899 9.1001L21.8517 10.7052L17.8835 14.6733L13.8485 10.7052L12.2434 9.1001Z" fill="#EEEEEE"/>
      </svg>
    </button>
    <div class='nav'>
      <button class='left' data-action='left' on:click={handleClick}>
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="49" height="49" rx="9.5" stroke="#EEEEEE"/>
          <path d="M29.5455 11L15 25.5L29.5455 40L35 34.5625L25.9091 25.5L35 16.4375L29.5455 11Z" fill="#EEEEEE"/>
        </svg>
      </button>
      <button class='right' data-action='right' on:click={handleClick}>
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="49" height="49" rx="9.5" stroke="#EEEEEE"/>
          <path d="M20.4545 11L35 25.5L20.4545 40L15 34.5625L24.0909 25.5L15 16.4375L20.4545 11Z" fill="#EEEEEE"/>
        </svg>
      </button>
    </div>
  </div>
</div>
<Footer />

<style lang="scss">
  .banner-wrapper {
    padding-top: 80px;
  }
  .banner {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1;

    h1 {
      color: #791111;
      font-size: max(min(64px, px2vw(64)), 50px);
      font-weight: bold;
    }
  }

  button:focus-visible {
    outline: 5px solid crimson;
    border-radius: 3px;
  }

  .note {
    display: block;
    font-size: px2rem(16);
    margin: 50px auto 25px;
    color: #777;
  }

  .gallery {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;

    &-wrapper {
      margin: px2vw(100) 32px;
    }

    &-image {
      width: 10%;
      height: 100;
      position: relative;
      overflow: hidden;
      margin-right: px2vw(10);
      margin-bottom: px2vw(20);
      will-change: transform;
      transition: transform 0.5s ease;
      
      img {
        width: 100%;
        height: 100%;
      }
      
      &:hover {
        cursor: pointer;
        z-index: 10;
      }
    }
  }

  .enlarge-section {
    position: fixed;
    background-color: #000000cc;
    top: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;

    & > div {
      position: fixed;
      z-index: 1000;
      top: 50%;
      left: 50%;
      transform: translate(-50% ,-50%);

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .close, .left, .right {
      top: min(-25px, px2vw(-50));
      width: max(20px, px2vw(35));
      height: max(20px, px2vw(35));
      position: fixed;
      z-index: 1001;
    }

    .close:focus {
      outline: 5px solid crimson;
      border-radius: 3px;
    }

    .nav {
      display: flex;

      .left {
        right: 6%;
      }
      .right {
        right: 0;
      }
    }
  }

@media screen and (max-width: 449px) {
  .gallery-image {
    width: 100%;

    &:hover {
      transform: none;
      cursor: default;
    }
  }
  .note {
    display: none;
  }

  .enlarge-section {
    display: none;
  }
}

@media screen and (min-width: 450px) {
  .gallery-image {
    width: 49%;

    &:hover {
      transform: scale(1.1);
    }
  }

  .enlarge-section {
    & > div {
      width: 80%;
    }
  }
}

@media screen and (min-width: 750px) {
  .gallery-image {
    width: 32%;


    &:hover {
      transform: scale(1.2);
    }
  }
}
@media screen and (min-width: 1000px) {
  .gallery-image {
    width: 19%;


    &:hover {
      transform: scale(1.3);
    }
  }

  .enlarge-section {
    & > div {
      width: 70%;
    }
  }
}
</style>