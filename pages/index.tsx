import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import AnimatedMainContent from '../components/AnimatedMainContent'
import Background from '../components/Background'
import Header from '../components/Header'
import { Skill } from '../components/Skill'
import { Column } from '../components/layout/Column'
import ProjectList from '../components/ProjectList'
import { ScrollButton } from '../components/ScrollButton'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home: NextPage = () => {
  return <>
	<Head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</Head>
	<Header />
	<div className={styles.about}>
		<h2>Hi! I'm</h2>
		<h1>Avery Keuben</h1>
		<h2>Full Stack Software Developer</h2>
	</div>
	<ScrollButton />
	<Background />
	<AnimatedMainContent>
		<h1>My Portfolio</h1>
		
		<Column ratios={[70, 30]}>
			<p>
				A list of my best projects, in various states of completion. While some projects
				are school assignments, most are completed in my free time.
			</p>
			<Link href="/projects"><button>See More</button></Link>
		</Column>
		<ProjectList></ProjectList>
		<Column ratios={[50, 50]}>
			<div>
				<h1>Languages</h1>
				<Skill delay={0.0} name="Java" value={85} colour="#ad340f" />
				<Skill delay={0.2} name="HTML" value={80} colour="#b17010" />
				<Skill delay={0.4} name="CSS" value={80} colour="#189b06" />
				<Skill delay={0.6} name="Typescript" value={75} colour="#0d6fa8" />
				<Skill delay={0.8} name="C#" value={30} colour="#560e91" />
			</div>
			<div>
				<h1>Technologies</h1>
				<Skill delay={1.0} name="Linux" value={85} colour="#f04916" />
				<Skill delay={1.2} name="React" value={70} colour="#f09916" />
				<Skill delay={1.4} name="Unity" value={70} colour="#2ff016" />
				<Skill delay={1.5} name="a" value={50} colour="#16a0f0" />
				<Skill delay={1.8} name="b" value={50} colour="#8e16f0" />
			</div>
		</Column>
	</AnimatedMainContent>
  </>
}

export default Home
