package com.todo.demo.common.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@PropertySource("classpath:/config.properties")
public class DBConfig {

	// 필드
	@Autowired
	private ApplicationContext applicationContext;

	@Bean
	@ConfigurationProperties(prefix = "spring.datasource.hikari")
	// prefix를 지정하여 spring.datasource.hikari으로 시작하는 설정을 모두 적용
	public HikariConfig hikariConfig() {
		
		return new HikariConfig();
	}

	@Bean
	public DataSource dataSource(HikariConfig config) {

		DataSource dataSource = new HikariDataSource(config);
		// DataSource : 
		// 어플리케이션이 데이터베이스에 연결할 때 사용하는 설정
		// 1) DB 연결 정보 제공 (url, username, password)
		// 2) Connection pool 관리 (Connection 생성/생명주기 관리)
		// 3) 트랜잭션 관리
		return dataSource;
	}

	// Mybatis 설정 추가

	// SqlSessionFactory : SqlSession을 만드는 객체
	@Bean
	public SqlSessionFactory sessionFactory(DataSource dataSource) throws Exception {
		// 매개변수로 DataSource를 받아와 DB 연결 정보를 사용할 수 있도록 함
		
		// Mybatis의 SqlSession을 생성하는 역할을 할 객체를 생성
		SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
		
		// sessionFactoryBean 이름의 공장에 Mybatis를 이용하기 위한 각종 세팅을 함
		
		sessionFactoryBean.setDataSource(dataSource);

		////////////////////////////////////////////////////////////////////////////////////
		////////// 세팅1. Mapper.xml(SQL 작성해둘 파일) 파일이 모이는 경로를 지정 //////////
		// -> Mybatis 코드 수행 시 xxx-mapper.xml을 읽을 수 있음
		// 매퍼 파일이 모여있는 경로 지정
		sessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:/mappers/**.xml"));
											  // 현재프로젝트.자원을얻겠다.src/main/resources/mappers/하위의 모든.xml
		
		////////////////////////////////////////////////////////////////////////////
		////////// 세팅2. 해당 패키지 내애 있는 모든 클래스의 별칭을 등록 //////////
		// -> Mybatis는 특정 클래스 지정 시 패키지명.클래스명까지 모두 작성해야함
		// -> 긴 이름을 짧게 부를 수 있도록 별칭을 설정할 수 있음
		
		// 별칭을 지정해야하는 DTO가 모여있는 패키지 지정
		// -> 해당 패키지에 있는 모든 클래스가 클래스명으로 별칭이 지정됨
		sessionFactoryBean.setTypeAliasesPackage("edu.kh.project");
		// -> edu.kh.todo 세팅시 패키지 하위에 있는 모든 클래스가 클래스명으로 별칭이 지정됨
		// -> ex) edu.kh.todo.model.dto.Todo -> Todo (별칭 등록)
		
		////////////////////////////////////////////////////////
		////////// 세팅3. Mybatis 설정 파일 경로 지정 //////////
		sessionFactoryBean.setConfigLocation(applicationContext.getResource("classpath:mybatis-config.xml"));
		// mybatis-config.xml의 내용을 읽어들임
		// -> jdbcTypeForNull / mapUnderscoreToCamelCase를 적용함
		
		// SqlSession 객체 반환
		return sessionFactoryBean.getObject();
	}

	// SqlSessionTemplate : 기본 SQL 실행 + 트랜잭션 처리
	// Connection + DBCP + Mybatis + 트랜잭션 처리
	@Bean
	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sessionFactory) {
		return new SqlSessionTemplate(sessionFactory);
	}

	// DataSourceTransactionManager : 트랜잭션 매니저
	@Bean
	public DataSourceTransactionManager dataSourceTransactionManager(DataSource dataSource) {
		return new DataSourceTransactionManager(dataSource);
	}
}
